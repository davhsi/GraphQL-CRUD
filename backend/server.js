const express = require('express');
const { graphqlHTTP } = require('express-graphql');
const schema = require('./graphql/schema');
const connectDB = require('./config/db');
const authMiddleware = require('./middleware/auth'); 
const cors = require('cors'); 
require('dotenv').config();

const app = express();
connectDB();

app.use(cors()); 
app.use(express.json());
app.use(authMiddleware); 

app.use('/graphql', graphqlHTTP((req) => ({
    schema: schema,
    graphiql: true,
    context: { user: req.user }, 
})));

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}/graphql`);
});
