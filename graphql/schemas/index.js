const userSchema = require('./userSchema');
const itemSchema = require('./itemSchema');
const { gql } = require('apollo-server');

const linkSchema = gql`
  type Query {
    _: Boolean
  }
  type Mutation {
    _: Boolean
  }
`;

module.exports = [linkSchema, userSchema, itemSchema];