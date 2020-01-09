import cors from 'cors';
import express from 'express';
import jwt from 'jsonwebtoken';
import mongoose from 'mongoose';
import { ApolloServer, AuthenticationError } from 'apollo-server-express';

import schemas from './graphql/schemas';
import resolvers from './graphql/resolvers';

import userModel from './models/user';
import itemModel from './models/item';

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
  context: async ({ req }) => {
    if (req) {
      const me = await getUser(req);

      return {
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