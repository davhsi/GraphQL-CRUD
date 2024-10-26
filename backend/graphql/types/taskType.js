const { GraphQLObjectType, GraphQLString, GraphQLInt, GraphQLBoolean } = require('graphql');

// Task type for GraphQL
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

module.exports = TaskType;
