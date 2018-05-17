import React from "react";
import ReactDOM from "react-dom";
import App from "./app";
import ApolloClient from "apollo-client";
import { ApolloProvider } from "react-apollo";
import { InMemoryCache } from "apollo-cache-inmemory";
import { HttpLink } from "apollo-link-http";
import { setContext } from "apollo-link-context";
import key from "../util/keys";

const cache = new InMemoryCache({
  dataIdFromObject: o => o.id || null
});

const link = new HttpLink({
  uri: "https://api.github.com/graphql"
});

const authLink = setContext(_ => {
  return {
    headers: {
      authorization: key ? `Bearer ${key}` : null
    }
  };
});

const client = new ApolloClient({
  link: authLink.concat(link),
  cache,
  request: operation => {
    operation.setContext({
      headers: {
        authorization: `Bearer ${key}`
      }
    });
  }
});

const Root = () => {
  return (
    <ApolloProvider client={client}>
      <App />
    </ApolloProvider>
  );
};

document.addEventListener("DOMContentLoaded", () => {
  const root = document.getElementById("root");

  ReactDOM.render(<Root />, root);
});
