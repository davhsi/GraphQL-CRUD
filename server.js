const express = require('express');
const { graphqlHTTP } = require('express-graphql');
const schema = require('./graphql/schema');
const connectDB = require('./config/db');
require('dotenv').config();

const app = express();
connectDB();

app.use('/graphql', graphqlHTTP({
    schema: schema,
    graphiql: true,
}));

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}/graphql`);
});
