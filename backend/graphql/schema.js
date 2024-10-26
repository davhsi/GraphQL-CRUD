const { GraphQLSchema, GraphQLObjectType } = require('graphql');
const userResolvers = require('./resolvers/userResolvers');
const taskResolvers = require('./resolvers/taskResolvers');

// Combine user and task queries into a single RootQuery
const RootQuery = new GraphQLObjectType({
  name: 'RootQuery',
  fields: {
    user: userResolvers.Query.user, // User query
    tasks: taskResolvers.Query.tasks, // Task query
  },
});

// Combine user and task mutations into a single RootMutation
const RootMutation = new GraphQLObjectType({
  name: 'RootMutation',
  fields: {
    signup: userResolvers.Mutation.signup,
    login: userResolvers.Mutation.login,
    createTask: taskResolvers.Mutation.createTask,
    updateTask: taskResolvers.Mutation.updateTask,
    deleteTask: taskResolvers.Mutation.deleteTask,
  },
});

// Define the schema with combined RootQuery and RootMutation
const schema = new GraphQLSchema({
  query: RootQuery,
  mutation: RootMutation,
});

module.exports = schema;
