const { Schema, model } = require('mongoose')

const ClientSchema = new Schema({
  id: { type: Schema.Types.ObjectId, require: true, unique: true },
  name: { type: String, require: true },
  email: { type: String },
  phone: { type: String }
})

module.exports = model('Client', ClientSchema)
