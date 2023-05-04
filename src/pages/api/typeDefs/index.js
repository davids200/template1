import { mergeTypeDefs } from '@graphql-tools/merge';
const userSchema = require('./user.typeDefs');
const smsSchema = require('./sms.typeDefs');
const bookSchema = require('./book.typeDefs');

const typeDefs = mergeTypeDefs([userSchema, smsSchema,bookSchema]);
 

module.exports = typeDefs;
