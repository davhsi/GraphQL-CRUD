const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type Task {
    id: ID!
    title: String!
    description: String!
    status: String!
  }

  type Query {
    tasks: [Task]
    task(id: ID!): Task
  }

  type Mutation {
    createTask(title: String!, description: String!, status: String!): Task
    updateTask(id: ID!, title: String, description: String, status: String): Task
    deleteTask(id: ID!): Task
  }
`;

module.exports = typeDefs;
