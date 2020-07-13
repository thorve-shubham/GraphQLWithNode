const graphQL = require('graphql');
const _ = require('lodash');

const { GraphQLObjectType, 
        GraphQLString, 
        GraphQLSchema, 
        GraphQLID,
        GraphQLInt,
        GraphQLList } = graphQL;

//dummmy book data
const books = [
    { name : "Expendables", genre:"Action", id:"3", authorId : "1"},
    { name : "Conjuring", genre:"Horror", id:"1", authorId : "2"},
    { name : "Hobbit", genre:"Fantasy", id:"2", authorId : "3"},
    { name : "Lord of the Rings", genre:"Fantasy", id:"4", authorId : "2"},
    { name : "Interstellar", genre:"Sci-fi", id:"5", authorId : "1"}
];

const authors = [
    {name : "Shubham Thorve", age : 24, address: "Pune, Maharashra", id : "1"},
    {name : "Sanket Kamble", age : 24, address: "Pune, Maharashra", id : "3"},
    {name : "Akash Hulbutti", age : 24, address: "Pune, Maharashra", id : "2"}
];

const AuthorType = new GraphQLObjectType({
    name : "AuthorType",
    fields : ()=>({
        id : { type : GraphQLID},
        name : { type : GraphQLString},
        age : { type : GraphQLInt},
        address : { type : GraphQLString},
        books : {
            type : GraphQLList(BookType),
            resolve : (parent,args)=>{
                return _.filter(books,{ authorId : parent.id});
            }
        }
    })
});

const BookType = new GraphQLObjectType({
    name : "BookType",
    fields : ()=> ({
        id : { type : GraphQLID},
        name : { type : GraphQLString},
        genre : { type : GraphQLString},
        author : {
            type : AuthorType,
            resolve : (parent,args)=>{
                console.log(parent);
                return _.find(authors,{ id : parent.authorId});
            }
        }
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
        },
        author : {
            type : AuthorType,
            args : { id : {type : GraphQLID}},
            resolve : (parent,args)=>{
                return _.find(authors,{ id : args.id});
            }
        }
    }
});

module.exports = new GraphQLSchema({
    query : RootQuery
});