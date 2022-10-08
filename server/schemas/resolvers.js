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
        },
        savedBooks: async (parent, args, context) => {
            if(context.user){
                return context.user.savedBooks;
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
                const book = { ...args };

                await User.findByIdAndUpdate(
                    { _id: context.user._id },
                    { $push: { savedBooks: book }},
                    { new: true }
                );

                return book;
            }

            return new AuthenticationError('You need to be logged in!');
        },

        // removeBook: async (parents, { bookId }, context) => {
        //     const bookToBeDeleted = await User.$where(
        //         function(){
        //             const theBook;

        //             for(let i = 0; i < context.user.savedBooks.length)
        //             if(context)
        //         }
        //     ) 
        //     await User.findOneAndUpdate(
        //         { _id: context.user._id },
        //         { }
        //     )
        // }
    }
};

module.exports = resolvers;