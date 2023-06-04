const { Schema, model } = require('mongoose')

const projectSchema = new Schema({
  clientId: { type: Schema.Types.ObjectId, ref: 'Client', require: true, unique: true },
  name: { type: String, require: true },
  description: { type: String },
  status: { type: String, enum: ['Not Started', 'In Progress', 'Done'], default: 'Not Started' }
})

module.exports = model('Project', projectSchema)
