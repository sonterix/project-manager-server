const { Schema, model } = require('mongoose')

const ProjectSchema = new Schema({
  id: { type: Schema.Types.ObjectId, require: true, unique: true },
  clientId: { type: Schema.Types.ObjectId, ref: 'Client', require: true, unique: true },
  name: { type: String, require: true },
  description: { type: String },
  status: { type: String, enum: ['Not Started', 'In Progress', 'Done'], default: 'Not Started' }
})

module.exports = model('Project', ProjectSchema)
