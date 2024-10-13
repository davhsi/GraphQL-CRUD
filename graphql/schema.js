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
    }),
});

const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        tasks: {
            type: new GraphQLList(TaskType),
            resolve: async () => {
                return await Task.getTasks();
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
            resolve: async (parent, args) => {
                return await Task.createTask(args);
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
            resolve: async (parent, args) => {
                return await Task.updateTask(args.id, args);
            },
        },
        deleteTask: {
            type: GraphQLString,
            args: {
                id: { type: new GraphQLNonNull(GraphQLInt) },
            },
            resolve: async (parent, args) => {
                return await Task.deleteTask(args.id);
            },
        },
        markAsCompleted: {
            type: TaskType,
            args: {
                id: { type: new GraphQLNonNull(GraphQLInt) },
            },
            resolve: async (parent, args) => {
                return await Task.markAsCompleted(args.id);
            },
        },
    },
});

module.exports = new GraphQLSchema({
    query: RootQuery,
    mutation: Mutation,
});
