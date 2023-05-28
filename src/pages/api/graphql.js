import Cors from 'micro-cors'
import {ApolloServer } from 'apollo-server-micro'
import './cronJobs/index'
const typeDefs = require('./typeDefs');
const resolvers = require('./resolvers');



export const config={
    api:{
        bodyParser:false
    }
}

const cors=Cors()

const apolloServer=new ApolloServer({
    typeDefs,
    resolvers, 
    context:({req})=>{ 
    },
    introspection:true,
    playground:true,
})

const serverStart=apolloServer.start();

export default cors(async(req,res)=>{
    if(req.method==='OPTIONS'){
        res.end()
        return false
    }
    await serverStart;
    await apolloServer.createHandler({path:'/api/graphql'}) (req,res); 
})