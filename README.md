# TypeScript

A superset of JavaScript 😎, JavaScript with Types and much more

## Setting Up Environment

### To install

-g flag to install it globally

```sh
$ npm i -g typescript
```

### To initialize

```sh
$ tsc --init
```
tsc -- TypeScript compiler (its installed when we npm i -g typescript)

This creates a tsconfig.json file

### To convert from js to ts

Use this to recompile as well

```sh
$ tsc tsapp.ts tojsapp.js
```

creates tojsapp.js file 

For continuous changes and constant watching

```sh
$ tsc -w
```

kinda like nodemon for node

# GraphQL

GraphQL is a query language for APIs and a runtime for fulfilling those queries with your existing data. GraphQL provides a complete and understandable description of the data in your API, gives clients the power to ask for exactly what they need and nothing more, makes it easier to evolve APIs over time, and enables powerful developer tools.

Basically we can dictate the response we want, how exactly it should return the response by providing a query. So we don't have to call that server more than one time and hence for certain senarios its better than Rest apis.

Building a GraphQL server with node and express

```sh
$ npm i express express-graphql graphql
```
To access Graphql

```javascript
const {GraphQLSchema, GraphQLObjectType} = require('graphql')
```
