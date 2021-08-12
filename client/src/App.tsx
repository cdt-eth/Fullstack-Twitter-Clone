import "./App.css";
import Users from "./components/Users";
import Landing from "./components/Landing";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import {
  ApolloClient,
  ApolloProvider,
  HttpLink,
  InMemoryCache,
} from "@apollo/client";
import { setContext } from "apollo-link-context";

const httpLink = new HttpLink({ uri: process.env.REACT_APP_URI });
const authLink = setContext(async (req, { headers }) => {
  const token = localStorage.getItem("token");

  return {
    ...headers,
    headers: {
      Authorization: token ? `Bearer ${token}` : null,
    },
  };
});

const link = authLink.concat(httpLink as any);
const client = new ApolloClient({
  link: link as any,
  cache: new InMemoryCache(),
});

function App() {
  return (
    <ApolloProvider client={client}>
      <Router>
        <Switch>
          <Route exact path="/">
            <Users />
          </Route>
          <Route path="/landing">
            <Landing />
          </Route>
        </Switch>
      </Router>
    </ApolloProvider>
  );
}

export default App;
