import { ApolloClient, InMemoryCache, HttpLink } from "@apollo/client/core";
import { gql } from "@apollo/client/core";

export default defineNuxtPlugin(async (nuxtApp) => {
  // Define the GraphQL endpoint
  const graphqlEndpoint = "https://testdrive.kompletecare.com/graphql";

  // Define the login mutation
  const LOGIN_MUTATION = gql`
    mutation Login($email: String!, $password: String!) {
      login(email: $email, password: $password)
    }
  `;

  // Create an HTTP link to the GraphQL endpoint
  const httpLink = new HttpLink({
    uri: graphqlEndpoint,
  });

  // Create an Apollo Client instance without authentication
  const apolloClient = new ApolloClient({
    link: httpLink,
    cache: new InMemoryCache(),
  });

  // Fetch the token using the login mutation
  const fetchToken = async () => {
    try {
      const response = await apolloClient.mutate({
        mutation: LOGIN_MUTATION,
        variables: {
          email: "tester@kompletecare.com", 
          password: "password", 
        },
      });

      return response.data.login;
    } catch (error) {
      console.error("Error logging in:", error);
      throw error;
    }
  };

  // Fetch the token dynamically
  const token = await fetchToken();

  // Create a new HTTP link with the authorization header
  const authenticatedHttpLink = new HttpLink({
    uri: graphqlEndpoint,
    headers: {
      Authorization: `Bearer ${token}`, // Use the fetched token in the authorization header
    },
  });

  // Create a new Apollo Client instance with authentication
  const authenticatedApolloClient = new ApolloClient({
    link: authenticatedHttpLink,
    cache: new InMemoryCache(),
  });

  // Provide the authenticated Apollo Client to the Nuxt app
  nuxtApp.provide("apollo", authenticatedApolloClient);
});
