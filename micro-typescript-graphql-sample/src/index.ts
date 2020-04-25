import {send} from 'micro'
import {get, post, router} from 'microrouter'
import {ApolloServer, gql} from 'apollo-server-micro'
import {makeExecutableSchema} from 'graphql-tools'

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

const typeDefs = gql`
type Book {
  title: String
  author: String
}

type Query {
  books: [Book]
}
`

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
