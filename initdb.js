const mongoose = require("mongoose");
const logger = require("./library/logger");
exports.initdb = () => {
  mongoose.connect(process.env.DB_CONNECT, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  mongoose.connection.on("error", (error) => {
    logger.info(`Error connecting DB ${error}`);
  });
  mongoose.connection.on("open", (error) => {
    error
      ? logger.info(`Error connecting DB ${error}`)
      : logger.info("Db Connection Sucess");
  });
};
