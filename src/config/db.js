const mongoose = require('mongoose')

const config = require('./index')

const connectDB = async () => {
  try {
    await mongoose.connect(config.db.uri || '')
    console.log('Connected to the database'.magenta)
  } catch (error) {
    console.error('Error connecting to the database:'.red, error)
  }
}

module.exports = connectDB
