const express = require('express');
const app = express();
const expressGraphQL = require('express-graphql');

const { GraphQLSchema, GraphQLObjectType } = require('graphql')

const schema = new GraphQLSchema({

});

app.use('/api', expressGraphQL({
    graphiql: true // sets up a gui 🤩
}))

const port = 3000;
app.listen(port, () => {
    console.log(`Listening at port ${port} 🚀`);
});