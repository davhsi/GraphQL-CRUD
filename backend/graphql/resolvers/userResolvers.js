const { GraphQLNonNull, GraphQLID, GraphQLString } = require('graphql');
const User = require('../../models/User');
const UserType = require('../types/userType');
const bcrypt = require('bcrypt'); 
const jwt = require('jsonwebtoken');


const UserQuery = {
  user: {
    type: UserType,
    args: { id: { type: new GraphQLNonNull(GraphQLID) } },
    resolve: async (_, { id }) => {
      return await User.getUserById(id);
    },
  },
};

const UserMutation = {
  signup: {
    type: UserType,
    args: {
      username: { type: new GraphQLNonNull(GraphQLString) },
      email: { type: new GraphQLNonNull(GraphQLString) },
      password: { type: new GraphQLNonNull(GraphQLString) },
    },
    resolve: async (_, { username, email, password }) => {
      const existingUser = await User.getUserByEmail(email);
      if (existingUser) throw new Error('User already exists');
      const newUser = await User.createUser({ username, email, password });
      return newUser;
    },
  },
  login: {
    type: UserType,
    args: {
        email: { type: GraphQLString },
        password: { type: GraphQLString },
    },
    resolve: async (_, { email, password }) => {
        // Fetch the user from the database
        const user = await User.getUserByEmail(email);
        if (!user) {
            throw new Error('Invalid email or password');
        }

        // Compare the provided password with the stored password
        const validPassword = await bcrypt.compare(password, user.password);
        if (!validPassword) {
            throw new Error('Invalid email or password');
        }

        // Generate and return a JWT token
        const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });
        return { token }; // Ensure that your UserType supports returning the token
    },
},
 
};

module.exports = { Query: UserQuery, Mutation: UserMutation };
