import { gql } from '@apollo/client';

export const GET_BOOKS = gql`
    query books {
        books {
            title
            author
        }
    }
`

export const BOOK_ADDED = gql`
    subscription bookAdded {
        bookAdded {
            title
            author
        }
    }
`