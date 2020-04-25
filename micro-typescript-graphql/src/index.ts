import {send} from 'micro'
import {get, post, router} from 'microrouter'
import {ApolloServer, gql} from 'apollo-server-micro'
import { makeExecutableSchema } from 'graphql-tools'
import {importSchema} from 'graphql-import'

const mockData = [
  {
    author: 'ちゃーりー',
    title: 'ねこをまぜるはなし'
  },
  {
    author: 'RG',
    title: 'なまこをきんしするはなし'
  }
]

const typeDefs = importSchema('src/typeDefs/schema.graphql')

console.log(typeDefs)

const resolvers = {
  Query: {
    books: () => mockData
  }
}

const schema = makeExecutableSchema({
  typeDefs,
  resolvers
})

const apolloServer = new ApolloServer({schema})
const graphqlHandler = apolloServer.createHandler({
  path: '/data'
})

module.exports = router(
  post('/data', graphqlHandler),
  get('/data', graphqlHandler)
)
