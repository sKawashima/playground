import * as express from 'express'
import * as express_graphql from 'express-graphql'
import {buildSchema} from 'graphql'

const schema = buildSchema(`
type Query {
	message: String,
	meu: String
}
`)

const root = {
	message: () => 'Hello World',
	meu: () => 'meumeumeu'
}

const app = express()

app.use('/graphql', express_graphql({
	schema: schema,
	rootValue: root,
	graphiql: true
}))

app.listen(3000, console.log('start localhost:3000/graphql'))
