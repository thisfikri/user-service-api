const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { AuthenticationError } = require('apollo-server');

module.exports =  {
  Query: {
    user: async (parent, { id }, { models: { userModel }, me }, info) => {
      if (!me) {
        throw new AuthenticationError('You are not authenticated');
      }
      const user = await userModel.findById({ _id: id }).exec();
      return user;
    },
    login: async (parent, { username, password }, { models: { userModel } }, info) => {
      const user = await userModel.findOne({ username }).exec();

      if (!user) {
        throw new AuthenticationError('Invalid credentials');
      }

      const matchPasswords = bcrypt.compareSync(password, user.password);

      if (!matchPasswords) {
        throw new AuthenticationError('Invalid credentials');
      }

      const token = jwt.sign({ id: user.id, role: user.role }, 'riddlemethis', { expiresIn: 24 * 10 * 50 });

      return {
        token,
      };
    },
  },
  Mutation: {
    createUser: async (parent, { username, password, role }, { models: { userModel } }, info) => {
      const user = await userModel.create({ username, password, role });
      return user;
    },
  }
};