const experss = require('express');
const app = experss();
const { graphqlHTTP } = require('express-graphql');
const { GraphQLObjectType, GraphQLSchema, GraphQLString } = require('graphql');

const importedSchema = require('./schema/schema');

app.use('/graphql',graphqlHTTP({
    graphiql : true,
    schema : importedSchema
}));

app.listen(3000,()=>{
    console.log("Server is listening at 3000");
})