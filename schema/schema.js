const graphQL = require('graphql');
const _ = require('lodash');

const { GraphQLObjectType, GraphQLString, GraphQLSchema } = graphQL;

//dummmy book data
const books = [
    { name : "Expendables", genre:"Action", id:"3"},
    { name : "Conjuring", genre:"Horror", id:"1"},
    { name : "Hobbit", genre:"Fantasy", id:"2"}
];

const BookType = new GraphQLObjectType({
    name : "BookType",
    fields : ()=> ({
        id : { type : GraphQLString},
        name : { type : GraphQLString},
        genre : { type : GraphQLString}
    })
});

const RootQuery = new GraphQLObjectType({
    name : "RootQueryType",
    fields : {
        book : { 
            type : BookType,
            args : { id : { type : GraphQLString}},
            resolve : (parent,args)=>{
                return _.find(books,{ id : args.id});
            }
        }
    }
})

module.exports = new GraphQLSchema({
    query : RootQuery
});