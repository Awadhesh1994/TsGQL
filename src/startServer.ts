import { importSchema } from "graphql-import";
import { GraphQLSchema } from "graphql";
import { makeExecutableSchema, mergeSchemas } from "graphql-tools";
import { createTypeOrmConnection } from "./utility/typeOrmConnection";
import { GraphQLServer } from "graphql-yoga";
import * as fs from "fs";
import * as path from "path";
import { verificationEmail } from "./routes/confirmEmail";
import { redis } from "./redis";

export const startServer = async () => {
  const schemas: GraphQLSchema[] = [];
  const folders = fs.readdirSync(path.join(__dirname, "./modules"));

  folders.forEach(folder => {
    const { resolvers } = require(`./modules/${folder}/resolvers`);
    const typeDefs = importSchema(
      path.join(__dirname, `./modules/${folder}/schema.graphql`)
    );
    schemas.push(makeExecutableSchema({ resolvers, typeDefs }));
  });
  
  const server = new GraphQLServer({
    schema: mergeSchemas({ schemas }),
    context: ({request}) => ({
      redis,
      url: request.protocol + "://" + request.get("host")
    })
  });

  server.express.get('/confirm/:id', verificationEmail);

  await createTypeOrmConnection();
  const app = await server.start({
    port: process.env.NODE_ENV === "test" ? 0 : 4000
  });
  console.log("Server is running on localhost:4000");
  return app;
};