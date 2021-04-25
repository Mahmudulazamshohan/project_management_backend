export default {
  mongodb: {
    host: process.env.MONGODB_HOST || "localhost",
    port: process.env.MONGODB_PORT || 27017,
    database: process.env.MONGODB_DATABASE || "testdb",
    options: {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
    },
  },
};
