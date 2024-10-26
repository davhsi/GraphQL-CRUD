const { GraphQLObjectType, GraphQLString, GraphQLInt } = require('graphql');

// User type for GraphQL
const UserType = new GraphQLObjectType({
    name: 'User',
    fields: () => ({
        id: { type: GraphQLInt },
        username: { type: GraphQLString },
        email: { type: GraphQLString },
        token: { type: GraphQLString },
    }),
});

module.exports = UserType;
