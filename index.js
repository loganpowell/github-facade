// const express = require('express');
// const bodyParser = require('body-parser');
// const {graphqlExpress, graphiqlExpress} = require('apollo-server-express');
// const {makeRemoteExecutableSchema, mergeSchemas, introspectSchema} = require('graphql-tools');
// const {createApolloFetch,} = require('apollo-fetch');
//
// async function run() {
// 	const createRemoteSchema = async (uri) => {
// 		const fetcher = createApolloFetch({uri});
// 		return makeRemoteExecutableSchema({
// 			schema: await introspectSchema(fetcher),
// 			fetcher
// 		});
// 	}
// 	const universeSchema = await createRemoteSchema('https://www.universe.com/graphql/beta')
// 	// const weatherSchema = await createRemoteSchema('https://5rrx10z19.lp.gql.zone/graphql');
// 	// const linkSchemaDefs = `
// 	// 	extend type Location {
// 	// 		weather: Weather
// 	// 	}
// 	//
//   //   extend type Event {
//   //       location: Location
// 	// 	}
//   // `
// 	const schema = mergeSchemas({
// 		schemas: [universeSchema, weatherSchema, linkSchemaDefs],
// 		resolvers: mergeInfo => ({
// 			Event: {
// 				location: {
// 					fragment: `fragment EventFragment on Event {cityName}`,
// 					resolve(parent, args, context, info) {
// 						const place = parent.cityName
// 						return mergeInfo.delegate(
// 							'query',
// 							'location',
// 							{place},
// 							context,
// 							info
// 						)
// 					}
// 				}
// 			}
// 		})
// 	})
//
// 	const app = express();
//
// 	app.use('/graphql', bodyParser.json(), graphqlExpress({schema}));
//
// 	app.use(
// 		'/graphiql',
// 		graphiqlExpress({
// 			endpointURL: '/graphql',
// 			query: `query {
//   event(id: "5983706debf3140039d1e8b4") {
//     title
//   }
// }
//       `,
// 		})
// 	);
//
// 	app.listen(process.env.PORT || 3000);
// 	console.log(`Server running. Open /graphiql to run queries.`);
// }
//
// try {
// 	run();
// } catch (e) {
// 	console.log(e, e.message, e.stack);
// }
