const { ApolloServer } = require('apollo-server');
const mongoose = require('mongoose');

const typeDefs = require('./schemas');
const resolvers = require('./resolvers')

const server = new ApolloServer({ typeDefs, resolvers });

const connect = `mongodb+srv://test_user:pZp9DrsfwtNyVWfw@cluster0-z4g3b.mongodb.net/test?retryWrites=true&w=majority`;

mongoose.connect(connect, { useNewUrlParser: true })
    .then(() => {
        server.listen(process.env.PORT || 5000).then(({ url }) => {
            console.log(`server running ${url}`);
        });
    })
    .catch(error => console.error(error));