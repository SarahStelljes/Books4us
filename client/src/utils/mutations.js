import { gql } from "@apollo/client";

export const LOGIN_USER = gql`
    mutation login($email: String!, $password: String!){
        login(email: $email, password: $password){
            token
            user{
                _id
                username
            }
        }
    }
`;

export const ADD_USER = gql`
    mutation addUser($username: String!, $email: String!, $password: String!) {
        addUser(username: $username, email: $email, password: $password) {
            token
            user {
                _id
                username
            }
        }
    }
`;

export const ADD_BOOK = gql`
    mutation addBook($bookId: String!, $authors: [String!]!, $description: String!, $image: String!, $title: String!){
        addBook(bookId: $bookId, authors: $authors, description: $description, image: $image, title: $title){
            username
            bookCount
            savedBooks {
                authors
                description
                image
                bookId
                link
                title
            }
        }
    }
`;

export const REMOVE_BOOK = gql`
    mutation removeBook($bookId: String!){
        removeBook(bookId: $bookId){
            username
            bookCount
            savedBooks {
                authors
                description
                image
                bookId
                link
                title
            }
        }
    }
`;