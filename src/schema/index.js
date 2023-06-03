const { GraphQLID, GraphQLString, GraphQLObjectType, GraphQLSchema, GraphQLList } = require('graphql')

const { Project, Client } = require('../models')

const ProjectType = new GraphQLObjectType({
  name: 'Project',
  fields: () => ({
    id: { type: GraphQLID },
    clientId: { type: GraphQLID },
    name: { type: GraphQLString },
    description: { type: GraphQLString },
    status: { type: GraphQLString },
    client: {
      type: ClientType,
      resolve: parent => {
        return Client.findById(parent.clientId)
      }
    }
  })
})

const ClientType = new GraphQLObjectType({
  name: 'Client',
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    email: { type: GraphQLString },
    phone: { type: GraphQLString }
  })
})

const RootQueryType = new GraphQLObjectType({
  name: 'RootQuery',
  fields: {
    projects: {
      type: new GraphQLList(ProjectType),
      resolve: () => {
        return Project.find()
      }
    },
    project: {
      type: ProjectType,
      args: { id: { type: GraphQLID } },
      resolve: (parent, args) => {
        return Project.findById(args.id)
      }
    },
    clients: {
      type: new GraphQLList(ClientType),
      resolve: () => {
        return Client.find()
      }
    },
    client: {
      type: ClientType,
      args: { id: { type: GraphQLID } },
      resolve: (parent, args) => {
        return Client.findById(args.id)
      }
    }
  }
})

module.exports = new GraphQLSchema({
  query: RootQueryType
})
