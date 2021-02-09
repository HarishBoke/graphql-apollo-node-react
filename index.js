const { gql, ApolloServer, PubSub } = require('apollo-server');

const typeDefs = gql`
    type Book {
        title: String
        author: String
    }

    type Query {
        books: [Book]
    }

    type Mutation {
        addBook(title: String, author: String): Book
    }

    type Subscription {
        bookAdded: Book
    }
`;

const books = [
    { title: 'Harry Potter', author: 'Harry Potter author' },
    { title: 'Spiderman', author: 'Spiderman author' },
    { title: 'Batman', author: 'Batman author' }
]

const pubsub = new PubSub();
const BOOK_ADDED = 'BOOK_ADDED';

const resolvers = {
    Query: {
        books: () => books
    },
    Mutation: {
        addBook: (parent, args, req, info) => {
            books.push({ ...args });
            pubsub.publish(BOOK_ADDED, { bookAdded: args });
            return books[books.length - 1];
        }
    },
    Book: {
        // Overriding resolve for book title
        title: (parentValue) => parentValue.title
    },
    Subscription: {
        bookAdded: {
            subscribe: () => pubsub.asyncIterator([BOOK_ADDED])
        }
    }
}

const apolloServer = new ApolloServer({
    typeDefs, resolvers
})

apolloServer.listen().then(({ url }) => {
    console.log('Server listening at ' + url);
})
