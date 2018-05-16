import React from "react";
import ReactDOM from "react-dom";
import App from "./app";
import ApolloClient from 'apollo-client';
import { ApolloProvider } from 'react-apollo';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { HttpLink } from 'apollo-link-http';

const cache = new InMemoryCache({
  dataIdFromObject: o => o.id || null
});

const link = new HttpLink({
  uri: 'https://api.github.com/graphql'
});

const client = new ApolloClient({
  link,
  cache
});

const Root = () => {
  return (
    <ApolloProvider client={ client }>
      <App/>
    </ApolloProvider>
  );
};

document.addEventListener("DOMContentLoaded", () => {
  const root = document.getElementById("root");

  ReactDOM.render(<Root />, root);
});
