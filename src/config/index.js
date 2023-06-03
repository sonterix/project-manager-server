module.exports = {
  mode: process.env.NODE_ENV,
  app: {
    port: process.env.PORT
  },
  db: {
    uri: process.env.MONGODB_URI
  }
}
