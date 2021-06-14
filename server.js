const bodyParser = require('body-parser');  
const cors = require('cors');  
const express = require('express');  
var db = require('./data/db')
var { graphqlHTTP } = require('express-graphql');
const schema = require('./schema');
require('dotenv').config()

const port = process.env.PORT || 4001;  
const app = express();  
app.use(cors(), express.json()); 
db.conn() 
app.use('/graphql', graphqlHTTP({
   schema: schema,
   graphiql: true,
 }));
app.listen(  
   port, () => console.info(  
      `Server started on port ${port}`  
   )  
);  