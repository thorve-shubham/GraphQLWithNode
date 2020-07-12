const graphQL = require('graphql');
const _ = require('lodash');

const { GraphQLObjectType, GraphQLString, GraphQLSchema, GraphQLID } = graphQL;

//dummmy book data
const books = [
    { name : "Expendables", genre:"Action", id:"3"},
    { name : "Conjuring", genre:"Horror", id:"1"},
    { name : "Hobbit", genre:"Fantasy", id:"2"}
];

const authors = [
    {name : "Shubham Thorve", age : 24, address: "Pune, Maharashra", id : "1"},
    {name : "Sanket Kamble", age : 24, address: "Pune, Maharashra", id : "3"},
    {name : "Akash Hulbutti", age : 24, address: "Pune, Maharashra", id : "2"}
];

const BookType = new GraphQLObjectType({
    name : "BookType",
    fields : ()=> ({
        id : { type : GraphQLID},
        name : { type : GraphQLString},
        genre : { type : GraphQLString}
    })
});

const AuthorType = new GraphQLObjectType({
    name : "AuthorType",
    fields : ()=>({
        name : { type : GraphQLString},
        age : { type : GraphQLString},
        address : { type : GraphQLString}
    })
});

const RootQuery = new GraphQLObjectType({
    name : "RootQueryType",
    fields : {
        book : { 
            type : BookType,
            args : { id : { type : GraphQLID}},
            resolve : (parent,args)=>{
                return _.find(books,{ id : args.id});
            }
        }
    }
})

module.exports = new GraphQLSchema({
    query : RootQuery
});