const { gql } = require('apollo-server-express');

const typeDefs = gql`
    type User {
        _id: ID
        username: String
        email: String
        password: String
        bookCount: Int
        savedBooks: [Book]
    }

    type Book {
        authors: [String]
        description: String
        bookId: String
        image: String
        link: String
        title: String
    }

    type Query {
        me: User
    }

    type Mutation {
        login(email: String!, password: String!): Auth
        addUser(username: String!, email: String!, password: String!): Auth
        addBook(bookId: String!, authors: [String!]!, description: String!, image: String!, title: String!): User
        removeBook(bookId: String!): User
    }

    type Auth {
        token: ID!
        user: User
    }
`;

module.exports = typeDefs;