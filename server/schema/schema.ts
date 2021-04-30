import {
  GraphQLObjectType,
  GraphQLString,
  GraphQLSchema,
  GraphQLID,
  GraphQLInt,
  GraphQLList,
} from "graphql";
import { session } from "../neo4j";

// GraphQL Types
const TweetType = new GraphQLObjectType({
  name: "Tweet",
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    text: { type: GraphQLString },
    author: {
      type: AuthorType,
      resolve(parent, args) {
        return [];
      },
    },
  }),
});

const AuthorType = new GraphQLObjectType({
  name: "Author",
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    tweets: {
      type: new GraphQLList(TweetType),
      resolve(parent, args) {
        return [];
      },
    },
  }),
});

const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  fields: {
    tweets: {
      type: new GraphQLList(TweetType),
      async resolve(parent, args) {
        const result: any = await session.run(
          "MATCH(n:Tweet) RETURN n LIMIT 100"
        );
        const data: any = result.records.map(
          (record) => record._fields[0].properties
        );
        return data;
      },
    },
    authors: {
      type: new GraphQLList(AuthorType),
      resolve(parent, args) {
        const results: any = session.run(
          "MATCH (n: Person) return n LIMIT 100"
        );
        const data: any = results.records.map(
          (record) => record._fields[0].properties
        );
        return results.records;
      },
    },
  },
});

const Mutation = new GraphQLObjectType({
  name: "Mutation",
  fields: {
    addTweet: {
      type: TweetType,
      args: {
        name: { type: GraphQLString },
        text: { type: GraphQLString },
      },
      resolve(parent, args) {
        return session.run(
          "CREATE (t:Tweet {name: $name, text: $text}) RETURN t",
          { name: args.name, text: args.text }
        );
      },
    },
    addAuthor: {
      type: AuthorType,
      args: {
        name: { type: GraphQLString },
      },
      resolve(parent, args) {
        return session.run("CREATE (a:Person {name: $name}) RETURN a", {
          name: args.name,
        });
      },
    },
  },
});

export default new GraphQLSchema({
  query: RootQuery,
  mutation: Mutation,
});
