const { AuthenticationError } = require('apollo-server');

const crudRoles = ["superadmin", "admin"]
const viewRoles = ["superadmin", "admin", "director", "hoe", "operator"]

module.exports = {
    Query: {
        item: async (parent, { id }, { models: { itemModel }, me }, info) => {
            if (!me) {
                throw new AuthenticationError('You are not authenticated');
            }

            if (!viewRoles.includes(me.role, 0)) {
                throw new AuthenticationError('You are not have permission to this action');
            }

            const item = await itemModel.findById({ _id: id }).exec();
            return item;
        },
        items: async (parent, args, { models: { itemModel }, me }, info) => {
            if (!me) {
                throw new AuthenticationError('You are not authenticated');
            }

            if (!viewRoles.includes(me.role, 0)) {
                throw new AuthenticationError('You are not have permission to this action');
            }

            const items = await itemModel.find().exec();
            return items;
        },
    },
    Mutation: {
        addItem: async (parent, { name }, { models: { itemModel }, me }, info) => {
            if (!me) {
                throw new AuthenticationError('You are not authenticated');
            }

            if (!crudRoles.includes(me.role, 0)) {
                throw new AuthenticationError('You are not have permission to this action');
            }

            const item = await itemModel.create({ name, createdBy: me.id });
            return item;
        },
        updateItem: async (parent, { id, name }, { models: { itemModel }, me }, info) => {
            if (!me) {
                throw new AuthenticationError('You are not authenticated');
            }
            
            if (!crudRoles.includes(me.role, 0)) {
                throw new AuthenticationError('You are not have permission to this action');
            }

            const item = await itemModel.updateOne({ _id: id }, {name});
            return item;
        },
        deleteItem: async (parent, {id}, {models: {itemModel}, me}, info) => {
            if (!me) {
                throw new AuthenticationError('You are not authenticated');
            }

            if (!crudRoles.includes(me.role, 0)) {
                throw new AuthenticationError('You are not have permission to this action');
            }

            const post = await itemModel.deleteOne({ _id: id });
            return post;
        }
    },
    Item: {
        createdBy: async ({ createdBy }, args, { models: { userModel } }, info) => {
            const user = await userModel.findById({ _id: createdBy }).exec();
            return user;
        },
    },
};