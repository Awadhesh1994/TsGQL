import { ResolverMap } from "../../types/graphql-utils";
import { User } from "../../entity/User";
import { InvlaidDetails, confirmEmailForlogin } from "./erroeMessages";
import * as bcrypt from "bcryptjs";

export const resolvers: ResolverMap = {
  Query: {
    rawat: () => "hello"
  },
  Mutation: {
    login: async (_, { email, password }: GraphQL.ILoginOnMutationArguments) => {
      const user = await User.findOne({ where: { email } });

      if (!user) {
        return [{
          path: "email",
          massege: InvlaidDetails
        }];
      }

      if (!user.confirmationEmail) {
        return [{
          path: "email",
          massege: confirmEmailForlogin
        }];
      }

      const pass = await bcrypt.compare(password, user.password);

      if (!pass) {
        return [{
          path: "email",
          massege: InvlaidDetails
        }];
      }

      return null;

    }
  }
};