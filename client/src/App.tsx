import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";
import "./App.css";

const client = new ApolloClient({
  uri: process.env.REACT_APP_URI,
  cache: new InMemoryCache(),
});

function App() {
  return (
    <ApolloProvider client={client}>
      <div>Twitter</div>
    </ApolloProvider>
  );
}

export default App;
