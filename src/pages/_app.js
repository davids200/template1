import '../styles/globals.css'
import 'tailwindcss/tailwind.css'
import { Provider } from 'react-redux'
 import { SessionProvider } from 'next-auth/react'
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify'; 
import { persistor, store } from '../../redux/store';
import { PersistGate } from 'redux-persist/integration/react'; 
//import { ApolloProvider } from "@apollo/react-hooks";
import { ApolloClient, InMemoryCache, ApolloProvider, gql } from '@apollo/client';
//import { ApolloClient, InMemoryCache } from 'apollo-boost'

 

 
function MyApp({ Component, pageProps }) {
  const url="/api/graphql"
  
  const client = new ApolloClient({
    uri: url,
    cache: new InMemoryCache(),
  });
  
  
  return (<>
  <SessionProvider  session={pageProps.session}>  
  <PersistGate loading={null} persistor={persistor}>
  <ApolloProvider client={client}>
 <Provider store={store}> 

 
 
<Component {...pageProps} />
 
     
                
    </Provider>  
    </ApolloProvider> 
    </PersistGate>    
    </SessionProvider> 
    <ToastContainer />
    
  </>
  )
}

export default MyApp

 