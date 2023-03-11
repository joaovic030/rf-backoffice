import { AppRoutes } from './AppRoutes';
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';
import { AuthProvider } from './features/auth/components/AuthProvider';
import 'bootstrap/dist/css/bootstrap.min.css';

const client = new ApolloClient({
  uri: 'http://localhost:3000/graphql',
  cache: new InMemoryCache(),
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
