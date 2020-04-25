"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const microrouter_1 = require("microrouter");
const apollo_server_micro_1 = require("apollo-server-micro");
const graphql_tools_1 = require("graphql-tools");
const mockData = [
    {
        author: 'ちゃーりー',
        title: 'ねこをまぜるはなし'
    },
    {
        author: 'RG',
        title: 'なまこをきんしするはなし'
    }
];
const typeDefs = apollo_server_micro_1.gql `
type Book {
  title: String
  author: String
}

type Query {
  books: [Book]
}
`;
const resolvers = {
    Query: {
        books: () => mockData
    }
};
const schema = graphql_tools_1.makeExecutableSchema({
    typeDefs,
    resolvers
});
const apolloServer = new apollo_server_micro_1.ApolloServer({ schema });
const graphqlHandler = apolloServer.createHandler({
    path: '/data'
});
module.exports = microrouter_1.router(microrouter_1.post('/data', graphqlHandler), microrouter_1.get('/data', graphqlHandler));
