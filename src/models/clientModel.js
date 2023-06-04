const { Schema, model } = require('mongoose')

const clientSchema = new Schema({
  name: { type: String, require: true },
  email: { type: String, require: true },
  phone: { type: String }
})

module.exports = model('Client', clientSchema)
