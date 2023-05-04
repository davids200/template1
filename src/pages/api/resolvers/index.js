const userResolver = require('./user.resolver');
const smsResolver = require('./sms.resolver');
const bookResolver = require('./book.resolver');

const resolvers = {
  Query: {
    // Add query resolvers here
    ...userResolver.Query,
    ...smsResolver.Query,
    ...bookResolver.Query
  },
  Mutation: {
    // Add mutation resolvers here
    ...userResolver.Mutation,
    ...smsResolver.Mutation,
  },
  // Add any other resolver types (e.g. Subscription) here
};

module.exports = resolvers;
