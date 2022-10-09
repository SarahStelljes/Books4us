import { gql } from '@apollo/client';

export const QUERY_ME = gql`
    {
        me {
            _id
            username
            email
            bookCount
            savedBooks {
                authors
                description
                bookId
                image
                title
            }
        }
    }
`;

export const QUERY_MY_BOOKS = gql`
    {
        me {
            savedBooks {
                authors
                description
                bookId
                image
                title
            }
        }
    }
`;