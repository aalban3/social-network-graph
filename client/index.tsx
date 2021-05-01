import React from "react";
import ReactDOM from "react-dom";
import App from "./app";
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";
const client = new ApolloClient({
  uri: "http://192.168.1.154:8080/graphql",
  cache: new InMemoryCache(),
});
ReactDOM.render(
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>,
  document.getElementById("app")
);
