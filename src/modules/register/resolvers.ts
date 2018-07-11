import * as bcrypt from "bcryptjs";
import { ResolverMap } from '../../types/graphql-utils';
import { User } from '../../entity/User';
import * as yup from 'yup';
import { ourMadeError } from "../../utility/ourMadeError";
import { emailToShort, emailAlreadyExist, emailInvalid } from './erroeMessages';
import { conformationOfEmailId } from '../../utility/conformationOfEmailId';
//import { emailSend } from "../../mailSend";

const registrationQuery = yup.object().shape({
  username: yup.string().min(5).max(255),
  email: yup.string().min(5, emailToShort).max(255).email(emailInvalid),
  password: yup.string().min(5).max(255)
});

export const resolvers: ResolverMap = {
  Query: {
    awadhesh: () => "hello"
  },
  Mutation: {
    register: async (_, args: GraphQL.IRegisterOnMutationArguments, { redis, url }) => {
      try {
        await registrationQuery.validate(args, { abortEarly: false });
      } catch (err) {
        return ourMadeError(err);
      }
      const { username, email, password } = args;
      const hashPassword = await bcrypt.hash(password, 10);
      const emailAlreadyExits = await User.findOne({
        where: { email },
        select: ["id"]
      });
      if (emailAlreadyExits) {
        return [
          {
            path: "email",
            message: emailAlreadyExist
          }
        ]
      }
      const u = User.create({
        username,
        email,
        password: hashPassword
      });
      await u.save();

      // if (process.env.NODE_ENV !== "test") {
      //   await emailSend(email, await conformationOfEmailId(url, u.id, redis));
      // }
      await conformationOfEmailId(url, u.id, redis);

      return null;
    }
  }
};
