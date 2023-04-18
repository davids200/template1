import { ApolloProvider } from '@apollo/client';
//import  SignupForm from '../../components/SignupForm'; 
import  SignUp  from '../../../components/auth/SignUp'; 
import client from '../../../apolloClient';

const Register = () => {
  return (
    <ApolloProvider client={client}>
      
      <SignUp />
    </ApolloProvider>
  );
};

export default Register;
