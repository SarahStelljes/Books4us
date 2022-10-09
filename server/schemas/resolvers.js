const { User } = require('../models');
const { AuthenticationError } = require('apollo-server-express');
const { signToken } = require('../utils/auth');

const resolvers = {
    Query: {
        me: async (parent, args, context) => {
            if(context.user) {
                const userData = await User.findOne({ _id: context.user._id })
                    .populate('savedBooks');
                return userData;
            }
            throw new AuthenticationError('Not logged in.');
        }
    },
    Mutation: {
        addUser: async (parent, args) => {
            const user = await User.create(args);
            const token = signToken(user);
            return { token, user };
        },
        login: async (parent, { email, password }) => {
            const user = await User.findOne({ email });

            if(!user) {
                throw new AuthenticationError('Incorrect credentials');
            }

            const correctPw = await user.isCorrectPassword(password);

            if(!correctPw){
                throw new AuthenticationError('Incorrect credentials');
            }

            const token = signToken(user);
            return { token, user };
        },
        addBook: async (parents, args, context) => {
            if(context.user){

                const addedToSavedBooks = await User.findByIdAndUpdate(
                    { _id: context.user._id },
                    { $push: { savedBooks: args } },
                    { new: true }
                );

                return addedToSavedBooks;
            }

            return new AuthenticationError('You need to be logged in!');
        },

        removeBook: async (parents, { bookId }, context) => {
            if(context.user){
                const removedFromSavedBooks = await User.findOneAndUpdate(
                    { _id: context.user._id },
                    { $pull: { savedBooks: { bookId: bookId } } },
                    { new: true }
                ).populate('savedBooks');

                return removedFromSavedBooks;
            }

            return new AuthenticationError('You need to be logged in!');
        }
    }
};

module.exports = resolvers;