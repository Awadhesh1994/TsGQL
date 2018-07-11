import { request } from "graphql-request";
import { InvlaidDetails } from "./erroeMessages";

const email = "awadhesh31dec@gmail.com";
const password = "rawat31dec";

const loginMutation = (e: string, p: string) => `
    mutation{
        login(email: "${e}", password: "${p}"){
            path
            message
        }
    }
`;

describe("All Cases for login !!", () => {

    test("Login not found !!", async () => {
        const response = await request(
            process.env.TEST_HOST as string,
            loginMutation(email, password)
        );
        expect(response).toEqual({
            login: [
                {
                    path: "email",
                    message: InvlaidDetails
                }
            ]
        });
    });

});