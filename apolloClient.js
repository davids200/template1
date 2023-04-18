import { ApolloClient, InMemoryCache } from '@apollo/client';
import { createUploadLink } from 'apollo-upload-client';

const client = new ApolloClient({
  link: createUploadLink({
    uri: '/api/graphql',
  }),
  cache: new InMemoryCache(),
});

export default client;











// import { ApolloClient, InMemoryCache } from '@apollo/client';
// import { GET_USERS, GET_USER_BY_ID } from './graphql/queries/userQueries';
// import { CREATE_USER, UPDATE_USER } from './graphql/mutations/userMutations';

// const client = new ApolloClient({
//   uri: '/api/graphql',
//   cache: new InMemoryCache(),
// });

// export { client, GET_USERS, GET_USER_BY_ID, CREATE_USER, UPDATE_USER };
