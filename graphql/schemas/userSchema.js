const { gql } = require('apollo-server');

module.exports =  gql`
    type User {
        id: ID!
        username: String!
        role: String!
    }

    type Token {
        token: String!
    }

    extend type Query {
        user(id: ID!): User!
        login(username: String!, password: String!): Token!
    }

    extend type Mutation {
        createUser(username: String!, password: String!, role: String!): User!
    }
`;