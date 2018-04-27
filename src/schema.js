require('dotenv').load()
const fetch = require('node-fetch'),
      { makeRemoteExecutableSchema, introspectSchema } = require('graphql-tools'),
      { createHttpLink } = require('apollo-link-http'),
      { setContext } = require('apollo-link-context')

module.exports = {
	getIntrospectSchema: async (url) => {
		// Create a link to a GraphQL instance by passing fetch instance and url
		const serviceLink = () => createHttpLink({
			uri: url,
			fetch
		});

    // console.log(setContext())

    // include context (logan)
    const link = setContext(() => ({
      headers: {
        'Authorization': `Bearer ${process.env.GH_API_KEY}`,
      }
    })).concat(serviceLink())

		// Fetch our schema
		const serviceSchemaDefinition = await introspectSchema(link);

		// make an executable schema
		return makeRemoteExecutableSchema({
			schema: serviceSchemaDefinition,
			link
		});
	}
};
