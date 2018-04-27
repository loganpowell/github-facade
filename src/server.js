// require('dotenv').load()
const express = require('express'),
    	app = express(),
    	PORT = process.env.PORT || 8081,
    	bodyParser = require('body-parser'),
    	{ graphqlExpress, graphiqlExpress } = require('apollo-server-express'),
    	{ mergeSchemas } = require('graphql-tools'),
    	{ getIntrospectSchema } = require('./schema');

//our graphql endpoints
const endpoints = [
	'https://api.github.com/graphql'
	// 'http://localhost:8083/graphql'
];

// if (!process.env.GH_API_KEY) {
//   throw new Error(
//     "Please provide an API key for G in the environment variable GH_API_KEY."
//   );
// }

//async function due to the async nature of grabbing all of our introspect schemas
(async function () {
	try {
		//promise.all to grab all remote schemas at the same time, we do not care what order they come back but rather just when they finish
		allSchemas = await Promise.all(endpoints.map(ep => getIntrospectSchema(ep)));
		//create function for /graphql endpoint and merge all the schemas
		app.use(
      '/graphql',
      bodyParser.json(),
      graphqlExpress({
        schema: mergeSchemas({
          schemas: allSchemas
        }),
        // tracing: true,
        // cacheControl: true,
      }));
    //setup graphiql (logan)
    const gql = String.raw;

    app.get(
      "/graphiql",
      graphiqlExpress({
        endpointURL: "/graphql",
        query: gql`
          query {
            repository (name: "Census_Academy" owner: "uscensusbureau") {
              issues (first: 100) {
                edges {
                  node {
                    id
                    labels(first: 10) {
                      edges {
                        node {
                          id
                          name
                        }
                      }
                    }
                    title
                    url
                    labels (first: 10) {
                      edges {
                        node {
                          name
                        }
                      }
                    }
                    comments {
                      totalCount
                    }
                    reactions {
                      totalCount
                    }
                  }
                }
              }
            }
          }
        `
      })
    );

		//start up a graphql endpoint for our main server
		app.listen(PORT, () => console.log('GraphQL API listening on port:' + PORT));
	} catch (error) {
		console.log('ERROR: Failed to grab introspection queries', error);
	}
})();
