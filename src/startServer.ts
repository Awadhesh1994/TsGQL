import { createTypeOrmConnection } from "./utility/typeOrmConnection";
import { GraphQLServer } from "graphql-yoga";
import { verificationEmail } from "./routes/confirmEmail";
import { redis } from "./redis";
import { genrateSchema } from "./utility/genrateSchema";

export const startServer = async () => {
  const server = new GraphQLServer({
    schema: genrateSchema(),
    context: ({request}) => ({
      redis,
      url: request.protocol + "://" + request.get("host")
    })
  });

  console.log(`url`);

  server.express.get('/confirm/:id', verificationEmail);

  await createTypeOrmConnection();
  const app = await server.start({
    port: process.env.NODE_ENV === "test" ? 0 : 4000
  });
  console.log("Server is running on localhost:4000");
  return app;
};