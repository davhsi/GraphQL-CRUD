const { GraphQLNonNull, GraphQLID, GraphQLString, GraphQLList, GraphQLBoolean } = require('graphql'); // Add GraphQLBoolean here
const Task = require('../../models/Task');
const TaskType = require('../types/taskType');

const taskResolvers = {
  Query: {
    tasks: {
      type: new GraphQLList(TaskType),
      args: { userId: { type: new GraphQLNonNull(GraphQLID) } },
      resolve: async (_, { userId }) => {
        return await Task.getTasksByUser(userId);
      },
    },
  },
  Mutation: {
    createTask: {
      type: TaskType,
      args: {
        name: { type: new GraphQLNonNull(GraphQLString) },
        description: { type: new GraphQLNonNull(GraphQLString) },
        deadline: { type: GraphQLString },
        userId: { type: new GraphQLNonNull(GraphQLID) },
      },
      resolve: async (_, { name, description, deadline, userId }) => {
        return await Task.createTask({ name, description, deadline, userId });
      },
    },
    updateTask: {
      type: TaskType,
      args: {
        id: { type: new GraphQLNonNull(GraphQLID) },
        name: { type: GraphQLString },
        description: { type: GraphQLString },
        deadline: { type: GraphQLString },
        completed: { type: GraphQLBoolean }, // This should work now
      },
      resolve: async (_, { id, ...data }) => {
        return await Task.updateTask(id, data);
      },
    },
    deleteTask: {
      type: GraphQLString,
      args: {
        id: { type: new GraphQLNonNull(GraphQLID) },
        userId: { type: new GraphQLNonNull(GraphQLID) },
      },
      resolve: async (_, { id, userId }) => {
        return await Task.deleteTask(id, userId);
      },
    },
  },
};

module.exports = taskResolvers;
