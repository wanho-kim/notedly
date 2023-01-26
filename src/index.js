const express = require('express');
const { ApolloServer } = require('apollo-server-express');
require('dotenv').config();

const db = require('./db');
const models = require('./models');

const port = process.env.PORT || 4000;
const DB_HOST = process.env.DB_HOST;

let notes = [
  { id: '1', content: 'This is a note', author: 'Adam Scott' },
  { id: '2', content: 'This is another note', author: 'Harlow Everly' },
  { id: '3', content: 'Oh hey look, another note!', author: 'Riley Harrison' }
];

const typeDefs = require('./schema');

const resolvers = {
  Query: {
    hello: () => 'Hello world!',
    notes: async () => await models.Note.find(),
    note: async (parent, { id }) => await models.Note.findById(id)
  },
  Mutation: {
    newNote: async (parent, { content }) => {
      return await models.Note.create({
        content: content,
        author: 'Wanho Kim'
      });
    }
  }
};

const app = express();

db.connect(DB_HOST);

app.get('/', (req, res) => res.send('Hello World'));

const server = new ApolloServer({
  typeDefs,
  resolvers
});

server.applyMiddleware({ app, path: `/api` });

app.listen(port, () =>
  console.log(
    `GraphQL Server running at http://localhost:${port}${server.graphqlPath}!`
  )
);
