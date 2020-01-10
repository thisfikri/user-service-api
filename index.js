const cors = require('cors');
const express = require('express');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const { ApolloServer, AuthenticationError } = require('apollo-server-express');
const dotenv = require('dotenv');

const schemas = require('./graphql/schemas');
const resolvers = require('./graphql/resolvers');

const userModel = require('./models/user');
const itemModel = require('./models/item');

dotenv.config()
const app = express();
app.use(cors());

const getUser = async (req) => {
  const token = req.headers["authorization"];
  
  if (token) {
    try {
      return await jwt.verify(token, 'riddlemethis');
    } catch (e) {
      throw new AuthenticationError('Your session expired. Sign in again.');
    }
  }
};

const server = new ApolloServer({
  typeDefs: schemas,
  resolvers,
  debug: (process.env.NODE_ENV == 'development'),
  context: async ({ req }) => {
    if (req) {
      const me = await getUser(req);
      const apiKey = req.headers['api-key']

      if (apiKey !== process.env.API_KEY) {
        throw new AuthenticationError('You not have an api.');
      }

      return {
        apiKey,
        me,
        models: {
          userModel,
          itemModel,
        },
      };
    }
  },
});

server.applyMiddleware({ app, path: '/graphql' });

app.listen(5000, () => {
  mongoose.connect('mongodb://graph1:123456@127.0.0.1:27017/graphdb', { useNewUrlParser: true, useUnifiedTopology: true });
});