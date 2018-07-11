import { request } from "graphql-request";
import { User } from "../../entity/User";
import { emailAlreadyExist, emailToShort, emailInvalid } from './erroeMessages';
import { createTypeOrmConnection } from '../../utility/typeOrmConnection';

const username = "awadhesh";
const email = "awadhesh31dec@outlook.com";
const password = "rawat31dec";

const mutation = (u: string, e: string, p: string) => `
mutation {
  register(username: "${u}", email: "${e}", password: "${p}") {
    path
    message
  }
}`;

beforeAll( async () => {
await createTypeOrmConnection();
});

describe("Register user", async () => {

  test("Checking dublication of user !!", async () => {

    const response = await request(
      process.env.TEST_HOST as string,
      mutation(username, email, password)
    );
    expect(response).toEqual({ register: null });
    const users = await User.find({ where: { email } });
    expect(users).toHaveLength(1);
    const user = users[0];
    expect(user.email).toEqual(email);
    expect(user.password).not.toEqual(password);

    const response2: any = await request(
      process.env.TEST_HOST as string,
      mutation(username, email, password)
    );

    expect(response2.register).toHaveLength(1);
    expect(response2.register[0]).toEqual({
      path: "email",
      message: emailAlreadyExist
    });

  });

  test("Checking user email !!", async () => {
    const response3 = await request(process.env.TEST_HOST as string, mutation(username, "sdss", password));
    expect(response3).toEqual({
      register: [
        {
          path: "email",
          message: emailToShort
        },
        {
          path: "email",
          message: emailInvalid
        }
      ]
    });
  });
});