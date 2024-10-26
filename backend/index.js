const express = require('express');
const { graphqlHTTP } = require('express-graphql');
require('dotenv').config(); // Load environment variables

const schema = require('./graphql/schema'); // Import your GraphQL schema

const connectDB = require('./config/db'); // Import database connection
const cors = require('cors'); // Import CORS for cross-origin requests

const app = express(); // Create an Express application
connectDB(); // Connect to the database
const db = require('./config/db'); // Ensure you are importing your DB setup

db.raw('SELECT 1+1 AS result')
  .then(() => {
    console.log('Database connection verified!');
  })
  .catch((err) => {
    console.error('Database connection failed:', err.message);
  });


// Middleware
app.use(cors()); // Enable CORS
app.use(express.json()); // Parse incoming JSON requests

// GraphQL endpoint
app.use('/graphql', graphqlHTTP((req) => ({
    schema: schema, // Set the GraphQL schema
    graphiql: true, // Enable GraphiQL UI for testing queries
})));

const PORT = process.env.PORT || 4000; // Set the port

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}/graphql`);
});
