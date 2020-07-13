const graphQL = require('graphql');
const _ = require('lodash');

const { GraphQLObjectType, 
        GraphQLString, 
        GraphQLSchema, 
        GraphQLID,
        GraphQLInt,
        GraphQLList } = graphQL;

const Author = require('../model/author');
const Book = require('../model/book');

//dummmy book data
// const books = [
//     { name : "Expendables", genre:"Action", id:"3", authorId : "1"},
//     { name : "Conjuring", genre:"Horror", id:"1", authorId : "2"},
//     { name : "Hobbit", genre:"Fantasy", id:"2", authorId : "3"},
//     { name : "Lord of the Rings", genre:"Fantasy", id:"4", authorId : "2"},
//     { name : "Interstellar", genre:"Sci-fi", id:"5", authorId : "1"}
// ];

// const authors = [
//     {name : "Shubham Thorve", age : 24, address: "Pune, Maharashra", id : "1"},
//     {name : "Sanket Kamble", age : 24, address: "Pune, Maharashra", id : "3"},
//     {name : "Akash Hulbutti", age : 24, address: "Pune, Maharashra", id : "2"}
// ];

const AuthorType = new GraphQLObjectType({
    name : "AuthorType",
    fields : ()=>({
        id : { type : GraphQLID},
        name : { type : GraphQLString},
        age : { type : GraphQLInt},
        address : { type : GraphQLString},
        books : {
            type : new GraphQLList(BookType),
            resolve : (parent,args)=>{
                return Book.find({authorId : parent.id});
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
                return Author.findById(parent.authorId);
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
                return Book.findById(args.id);
            }
        },
        author : {
            type : AuthorType,
            args : { id : {type : GraphQLID}},
            resolve : (parent,args)=>{
                return Author.findById(args.id);
            }
        },
        books : {
            type : new GraphQLList(BookType),
            resolve : (parent,args)=>{
                return Book.find();
            }
        },
        authors : {
            type : new GraphQLList(AuthorType),
            resolve : (parent,args)=>{
                return Author.find();
            }
        }
    }
});

const Mutation = new GraphQLObjectType({
    name : 'Mutation',
    fields : {
        addAuthor :{
            type : AuthorType,
            args : {
                name : { type : GraphQLString},
                age : { type : GraphQLInt},
                address : { type : GraphQLString}
            },
            resolve : (parent,args)=>{
                let author = new Author({
                    name : args.name,
                    age : args.age,
                    address : args.address
                });

                return author.save();
            }
        },
        addBook : {
            type : BookType,
            args : {
                name : { type : GraphQLString},
                genre : { type : GraphQLString},
                authorId : { type : GraphQLID}
            },
            resolve : (parent,args)=>{
                let book = new Book({
                    name : args.name,
                    genre : args.genre,
                    authorId : args.authorId
                });
                return book.save();
            }
        }
    }
})

module.exports = new GraphQLSchema({
    query : RootQuery,
    mutation : Mutation
});