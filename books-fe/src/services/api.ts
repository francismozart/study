import {
  ApolloClient,
  InMemoryCache,
  gql,
  NormalizedCacheObject,
} from "@apollo/client";

export const client: ApolloClient<NormalizedCacheObject> = new ApolloClient({
  uri: "http://localhost:4000/",
  cache: new InMemoryCache(),
});

export const BOOK_QUERY = gql`
  query getBooks {
    books {
      id
      title
      author {
        id
        name
      }
    }
  }
`;
