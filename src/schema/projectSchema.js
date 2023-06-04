const { GraphQLObjectType, GraphQLID, GraphQLString, GraphQLNonNull, GraphQLEnumType } = require('graphql')

const { ClientModel } = require('../models')
const { ClientType } = require('./clientSchema')

const ProjectStatusType = new GraphQLEnumType({
  name: 'ProjectStatus',
  values: {
    NEW: { value: 'Not Started' },
    PROGRESS: { value: 'In Progress' },
    DONE: { value: 'Done' }
  }
})

const ProjectType = new GraphQLObjectType({
  name: 'Project',
  fields: () => ({
    _id: { type: GraphQLNonNull(GraphQLID) },
    clientId: { type: GraphQLNonNull(GraphQLID) },
    name: { type: GraphQLNonNull(GraphQLString) },
    description: { type: GraphQLString },
    status: { type: ProjectStatusType },
    client: {
      type: ClientType,
      resolve: parent => {
        return ClientModel.findById(parent.clientId)
      }
    }
  })
})

module.exports = {
  ProjectStatusType,
  ProjectType
}
