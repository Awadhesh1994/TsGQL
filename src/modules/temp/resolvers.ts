import { ResolverMap } from '../../types/graphql-utils';

export const resolvers: ResolverMap = {
  Query: {
    hello: (_, { name }: any) => `Bye ${name || "World"}`
  }
};
