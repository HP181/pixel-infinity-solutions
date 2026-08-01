"use client";
import { ApolloProvider } from "@apollo/client/react";
import { getApolloClient } from "@/lib/apolloClient";

export default function ApolloClientProvider({ children }) {
  return (
    <ApolloProvider client={getApolloClient()}>{children}</ApolloProvider>
  );
}
