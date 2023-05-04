import { ApolloServer } from 'apollo-server-micro'
import { makeExecutableSchema } from '@graphql-tools/schema'
import { applyMiddleware } from 'graphql-middleware'
import authMiddleware from './middleware/authenticate'
const  resolvers  = require('./resolvers'); 
const  typeDefs  = require('./typeDefs'); 

const schema = makeExecutableSchema({
  typeDefs,
  resolvers,
})

const server = new ApolloServer({
  schema: applyMiddleware(schema, authMiddleware),
  context: ({ req }) => {
    return {
      user: req.user,
    }
  },
})

export default server.createHandler({ path: '/api/graphql' })
