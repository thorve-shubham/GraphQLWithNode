const experss = require('express');
const app = experss();
const cors = require('cors')
const { graphqlHTTP } = require('express-graphql');

const mongoose = require('mongoose');

mongoose.connect("mongodb://localhost/gql-shubham",{ useNewUrlParser : true,useUnifiedTopology : true})
    .then(()=>{ console.log("Connected to DB")})
    .catch((err)=>{ console.log("Something went Wrong") });

const importedSchema = require('./schema/schema');


app.use(cors);
app.use('/graphql',graphqlHTTP({
    graphiql : true,
    schema : importedSchema
}));


app.listen(3000,()=>{
    console.log("Server is listening at 3000");
})