const { ApolloServer, gql } = require("apollo-server");
const {
  ApolloServerPluginLandingPageLocalDefault,
} = require("apollo-server-core");

const books = [
  {
    id: 1,
    title: "The Lords of the Rings - Return of the King",
    author: 1,
  },
  { id: 2, title: "A song of Ice and Fire: A Dance with Dragons", author: 2 },
  { id: 3, title: "Foundation", author: 3 },
  { id: 4, title: "Dune", author: 4 },
];

const authors = [
  { id: 1, name: "JRR Tolkien" },
  { id: 2, name: "George RR Martin" },
  { id: 3, name: "Isaac Asimov" },
  { id: 4, name: "Frank Herbert" },
];

const typeDefs = gql`
  type Book {
    id: ID!
    title: String!
    author: Author
  }

  type Author {
    id: ID!
    name: String!
    books: [Book]
  }

  type Query {
    books: [Book]
    authors: [Author]
  }
`;

const resolvers = {
  Query: {
    books: () => books,
    authors: () => authors,
  },
  Book: {
    author(parent) {
      return authors.find((author) => author.id === parent.author);
    },
  },
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
  csrfPrevention: true,
  cache: "bounded",
  plugins: [ApolloServerPluginLandingPageLocalDefault({ embed: true })],
});

server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});
