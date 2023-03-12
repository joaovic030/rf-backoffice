import { AppRoutes } from './AppRoutes';
import { ApolloClient, InMemoryCache, ApolloProvider, createHttpLink } from '@apollo/client';
import { AuthProvider } from './features/auth/components/AuthProvider';
import 'bootstrap/dist/css/bootstrap.min.css';

const link = createHttpLink({
  uri: 'http://localhost:3000/graphql',
  credentials: 'include'
});

const client = new ApolloClient({
  cache: new InMemoryCache(),
  link
});

function App() {
  return (
    <ApolloProvider client={client}>
      <AuthProvider>
        <AppRoutes />
      </AuthProvider>
    </ApolloProvider>
  );
}

export default App;
