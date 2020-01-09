import { gql } from 'apollo-server';

export default gql`
    type Item {
        id: ID,
        name: String,
        createdBy: User
    }

    type Modified {
        ok: Boolean!
    }

    extend type Query {
        items: [Item!]!
        item(id: ID!): Item!
    }

    extend type Mutation {
        addItem(name: String!): Item
        updateItem(id: ID!, name: String): Modified
        deleteItem(id: ID!): Boolean
    }
`;