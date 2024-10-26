const { GraphQLObjectType, GraphQLSchema, GraphQLString, GraphQLInt, GraphQLBoolean, GraphQLList, GraphQLNonNull } = require('graphql');
const Task = require('../models/taskModel');

const TaskType = new GraphQLObjectType({
    name: 'Task',
    fields: () => ({
        id: { type: GraphQLInt },
        name: { type: GraphQLString },
        description: { type: GraphQLString },
        deadline: { type: GraphQLString },
        completed: { type: GraphQLBoolean },
        userId: { type: GraphQLInt }, 
    }),
});


const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        tasks: {
            type: new GraphQLList(TaskType),
            resolve: async (_, __, context) => {
                const userId = context.user.id; // Access user ID from context
                return await Task.getTasksByUser(userId); // Fetch tasks for the authenticated user
            },
        },
    },
});

const Mutation = new GraphQLObjectType({
    name: 'Mutation',
    fields: {
        createTask: {
            type: TaskType,
            args: {
                name: { type: new GraphQLNonNull(GraphQLString) },
                description: { type: GraphQLString },
                deadline: { type: GraphQLString },
            },
            resolve: async (_, args, context) => {
                const userId = context.user.id; // Access user ID from context
                return await Task.createTask({ ...args, userId }); // Include userId when creating the task
            },
        },
        updateTask: {
            type: TaskType,
            args: {
                id: { type: new GraphQLNonNull(GraphQLInt) },
                name: { type: GraphQLString },
                description: { type: GraphQLString },
                deadline: { type: GraphQLString },
                completed: { type: GraphQLBoolean },
            },
            resolve: async (_, args, context) => {
                const userId = context.user.id; // Access user ID from context
                return await Task.updateTask(args.id, { ...args, userId }); // Only allow updates for user’s tasks
            },
        },
        deleteTask: {
            type: GraphQLString,
            args: {
                id: { type: new GraphQLNonNull(GraphQLInt) },
            },
            resolve: async (_, args, context) => {
                const userId = context.user.id; // Access user ID from context
                return await Task.deleteTask(args.id, userId); // Only allow deletion for user’s tasks
            },
        },
        markAsCompleted: {
            type: TaskType,
            args: {
                id: { type: new GraphQLNonNull(GraphQLInt) },
            },
            resolve: async (_, args, context) => {
                const userId = context.user.id; // Access user ID from context
                return await Task.markAsCompleted(args.id, userId); // Only mark as completed for user’s tasks
            },
        },
    },
});

module.exports = new GraphQLSchema({
    query: RootQuery,
    mutation: Mutation,
});
