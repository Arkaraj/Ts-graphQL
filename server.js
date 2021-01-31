const express = require('express');
const app = express();
const { graphqlHTTP } = require('express-graphql');

const { GraphQLSchema, GraphQLObjectType, GraphQLString, GraphQLList, GraphQLInt, GraphQLNonNull } = require('graphql')

const { Books: Book, Authors: Author } = require('./book')

// Root Query

// Custom object
const BookType = new GraphQLObjectType({
    name: 'Book',
    description: 'This represents a book written by an author',
    fields: () => ({
        id: { type: GraphQLNonNull(GraphQLInt) },
        name: { type: GraphQLNonNull(GraphQLString) },
        authorId: { type: GraphQLNonNull(GraphQLInt) },
        author: {
            type: AuthorType,
            resolve: (book) => {
                return Author.find(author => author.aid === book.authorId)
            }
        }
        // Does not give any info xyz: { type: GraphQLNonNull(GraphQLInt) }
    })
})

const AuthorType = new GraphQLObjectType({
    name: 'Author',
    description: 'This represents author of a book',
    fields: () => ({
        aid: { type: GraphQLNonNull(GraphQLInt) },
        name: { type: GraphQLNonNull(GraphQLString) },
        books: {
            type: new GraphQLList(BookType),
            resolve: (author) => {
                return Book.filter(book => book.authorId === author.aid)
            }
        }
    })
})

// Main root Query
const RootQueryType = new GraphQLObjectType({
    name: "Query",
    description: 'Root Query',
    fields: () => ({
        book: {
            type: BookType,
            description: 'Get a single Book',
            args: {
                id: { type: GraphQLNonNull(GraphQLInt) }
            },
            resolve: (parent, args) => {
                return Book.find(book => book.id === args.id)
            }
        },
        author: {
            type: AuthorType,
            description: 'Get a single Author',
            args: {
                aid: { type: GraphQLNonNull(GraphQLInt) }
            },
            resolve: (parent, args) => {
                return Author.find(author => author.aid === args.aid)
            }
        },
        books: {
            type: GraphQLList(BookType),
            description: 'List of all books',
            resolve: () => Book
        },
        authors: {
            type: GraphQLList(AuthorType),
            description: 'List of all Authors',
            resolve: () => Author
        }
    })
})

// defines schema
const schema = new GraphQLSchema({
    query: RootQueryType
})
/*const schema = new GraphQLSchema({
    query: new GraphQLObjectType({
        name: 'HelloWorld',
        fields: () => ({
            msg: {
                type: GraphQLString,
                resolve: () => "Hello World"
            }
        })
    })
}); */

app.use('/api', graphqlHTTP({
    schema,
    graphiql: true // sets up a gui 🤩
}))

const port = 3000;
app.listen(port, () => {
    console.log(`Listening at port ${port} 🚀`);
});