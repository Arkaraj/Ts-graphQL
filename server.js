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
    fields: () => ({ // Fields is a functions that returns object
        // Get with /:id kindda thing
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
        // GET all thing
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

// Mutations --> POST,PUT/PATCH of GraphQL

const RootMutationType = new GraphQLObjectType({
    name: 'Mutation',
    description: "Root Mutations",
    fields: () => ({
        addBook: {
            type: BookType,
            description: 'Add a Books to Book',
            args: {
                name: { type: GraphQLNonNull(GraphQLString) },
                authorId: { type: GraphQLNonNull(GraphQLInt) },
            },
            resolve: (parent, args) => {
                const book = {
                    id: Book.length + 1,
                    name: args.name,
                    authorId: args.authorId
                }
                Book.push(book);
                return book;
            }
        },
        addAuthor: {
            type: AuthorType,
            description: 'Add a Author to Author', // Database
            args: {
                name: { type: GraphQLNonNull(GraphQLString) }
            },
            resolve: (parent, args) => {
                const author = {
                    aid: Author.length + 1,
                    name: args.name
                }
                Author.push(author);
                return author;
            }
        },
        updateBook: {
            type: BookType,
            description: 'Modifys a Book',
            args: {
                id: { type: GraphQLNonNull(GraphQLInt) },
                name: { type: GraphQLNonNull(GraphQLString) },
                authorId: { type: GraphQLNonNull(GraphQLInt) }
            },
            resolve: (book, args) => {
                const bookIndex = Book.findIndex(b => b.id === args.id)
                Book[bookIndex].name = args.name
                Book[bookIndex].authorId = args.authorId

                return Book[bookIndex];
            }
        },
        // Same method for delete
        deleteBook: {
            type: BookType,
            description: 'Deltes a Book',
            args: {
                id: { type: GraphQLNonNull(GraphQLInt) }
            },
            resolve: (book, args) => {
                const bookIndex = Book.findIndex(b => b.id === args.id)
                Book.splice(bookIndex, 1)

                return Book[bookIndex];
            }
        }
    })
});

// defines schema
const schema = new GraphQLSchema({
    query: RootQueryType,
    mutation: RootMutationType
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