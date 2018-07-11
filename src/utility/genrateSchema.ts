import { importSchema } from "graphql-import";
import { GraphQLSchema } from "graphql";
import { makeExecutableSchema, mergeSchemas } from "graphql-tools";
import * as fs from "fs";
import * as path from "path";

export const genrateSchema = () => {
    const schemas: GraphQLSchema[] = [];
    const folders = fs.readdirSync(path.join(__dirname, "../modules"));
    folders.forEach(folders => {
      const { resolvers } = require(`../modules/${folders}/resolvers`);
      const typeDefs = importSchema(
        path.join(__dirname, `../modules/${folders}/schema.graphql`)
      );
      schemas.push(makeExecutableSchema({ resolvers, typeDefs }));
    });

    return mergeSchemas({ schemas });
};