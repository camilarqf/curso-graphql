/* /"scripts": {
    "start": "nodemon" //faz auto-restart da aplicação, toda vez que um arquivo do projeto for modificado.
  }, isso tá no package.json */
const { ApolloServer, gql } = require("apollo-server");
const { importSchema } = require("graphql-import");
const resolvers = require("./resolvers"); /*carrega a pasta e ele identifica o index */

//tmplate string
const schemaPath = "./Schema/index.graphql";
const server = new ApolloServer({
  typeDefs: importSchema(schemaPath),
  resolvers,
});

server.listen().then(({ url }) => {
  console.log(`Executando em ${url}`);
});
