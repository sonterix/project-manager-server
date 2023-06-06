const { Schema, model } = require('mongoose')

const projectSchema = new Schema({
  clientId: { type: String, ref: 'Client', require: true },
  name: { type: String, require: true },
  description: { type: String },
  status: { type: String, enum: ['Not Started', 'In Progress', 'Done'], default: 'Not Started' }
})

module.exports = model('Project', projectSchema)
