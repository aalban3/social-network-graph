import { Neo4jGraphQL } from "@neo4j/graphql";
import driver from "../neo4j";
import { makeAugmentedSchema } from "neo4j-graphql-js";
import { ApolloServer } from "apollo-server-express";

const typeDefs = `
type User {
  name: String! @unique
  tweets: [Tweet] @relation(name: "POSTS", direction: OUT)
}

type Tweet {
  tweetId: ID!
  text: String
  user: User @relation(name: "POSTS", direction: IN)
}

type Query {
  users: [User]
  tweets: [Tweet]
}
`;

const schema = makeAugmentedSchema({ typeDefs });
const apollo = new ApolloServer({ schema, context: { driver } });

export default apollo;
