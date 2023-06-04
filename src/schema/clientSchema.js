const { GraphQLObjectType, GraphQLID, GraphQLString, GraphQLNonNull } = require('graphql')

const ClientType = new GraphQLObjectType({
  name: 'Client',
  fields: () => ({
    _id: { type: GraphQLNonNull(GraphQLID) },
    name: { type: GraphQLNonNull(GraphQLString) },
    email: { type: GraphQLNonNull(GraphQLString) },
    phone: { type: GraphQLString }
  })
})

module.exports = { ClientType }
