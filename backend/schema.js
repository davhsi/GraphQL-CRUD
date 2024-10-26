const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type User {
    id: ID!
    username: String!
    email: String!
  }

  type Task {
    id: ID!
    title: String!
    description: String!
    status: String!
    userId: ID!  # Associate task with user
  }

  type Query {
    tasks: [Task]
    task(id: ID!): Task
    tasksByUser(userId: ID!): [Task]  # Fetch tasks by user
  }

  type Mutation {
    createTask(title: String!, description: String!, status: String!): Task
    updateTask(id: ID!, title: String, description: String, status: String): Task
    deleteTask(id: ID!): Task
    signup(username: String!, email: String!, password: String!): User  # Signup mutation
    login(email: String!, password: String!): String  # Login mutation returns token
  }
`;

module.exports = typeDefs;
