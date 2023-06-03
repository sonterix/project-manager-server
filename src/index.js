require('dotenv').config()
require('colors')
const express = require('express')
const { graphqlHTTP } = require('express-graphql')

const config = require('./config')
const connectDB = require('./config/db')
const schema = require('./schema')

const app = express()
connectDB()

app.use(
  '/graphql',
  graphqlHTTP({
    schema,
    graphiql: config.mode === 'development'
  })
)

app.listen(config.app.port, () => {
  console.log('Server started at: '.cyan + `http://localhost:${config.app.port}`.underline.cyan)
})
