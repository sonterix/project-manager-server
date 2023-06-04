const { GraphQLID, GraphQLString, GraphQLObjectType, GraphQLSchema, GraphQLList, GraphQLNonNull } = require('graphql')

const { ClientModel, ProjectModel } = require('../models')
const { ClientType } = require('./clientSchema')
const { ProjectType, ProjectStatusType } = require('./projectSchema')

const RootQueryType = new GraphQLObjectType({
  name: 'RootQuery',
  fields: {
    projects: {
      type: new GraphQLList(ProjectType),
      resolve: () => {
        return ProjectModel.find()
      }
    },
    project: {
      type: ProjectType,
      args: { id: { type: GraphQLID } },
      resolve: (_, { id }) => {
        return ProjectModel.findById(id)
      }
    },
    clients: {
      type: new GraphQLList(ClientType),
      resolve: () => {
        return ClientModel.find()
      }
    },
    client: {
      type: ClientType,
      args: { id: { type: GraphQLID } },
      resolve: (_, { id }) => {
        return ClientModel.findById(id)
      }
    }
  }
})

const RootMutationType = new GraphQLObjectType({
  name: 'RootMutation',
  fields: {
    addClient: {
      type: ClientType,
      args: {
        name: { type: GraphQLNonNull(GraphQLString) },
        email: { type: GraphQLNonNull(GraphQLString) },
        phone: { type: GraphQLString }
      },
      resolve: (_, { name, email, phone }) => {
        const newClient = new ClientModel({ name, email, phone })
        return newClient.save()
      }
    },
    deleteClient: {
      type: ClientType,
      args: {
        id: { type: GraphQLNonNull(GraphQLID) }
      },
      resolve: (_, { id }) => {
        return ClientModel.findByIdAndDelete(id)
      }
    },
    addProject: {
      type: ProjectType,
      args: {
        clientId: { type: GraphQLNonNull(GraphQLID) },
        name: { type: GraphQLNonNull(GraphQLString) },
        description: { type: GraphQLString },
        status: { type: ProjectStatusType, defaultValue: 'Not Started' }
      },
      resolve: (_, { clientId, name, description, status }) => {
        const newProject = new ProjectModel({ clientId, name, description, status })
        return newProject.save()
      }
    },
    updateProject: {
      type: ProjectType,
      args: {
        id: { type: GraphQLNonNull(GraphQLID) },
        clientId: { type: GraphQLID },
        name: { type: GraphQLString },
        description: { type: GraphQLString },
        status: { type: ProjectStatusType }
      },
      resolve: (_, { id, clientId, name, description, status }) => {
        return ProjectModel.findByIdAndUpdate(id, { $set: { clientId, name, description, status } }, { new: true })
      }
    },
    deleteProject: {
      type: ProjectType,
      args: { id: { type: GraphQLNonNull(GraphQLID) } },
      resolve: (_, { id }) => {
        return ProjectModel.findByIdAndRemove(id)
      }
    }
  }
})

module.exports = new GraphQLSchema({
  query: RootQueryType,
  mutation: RootMutationType
})
