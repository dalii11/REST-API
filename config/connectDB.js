const mongoose = require("mongoose");
require("dotenv").config({ path: ".env" });

module.exports = () => {
  mongoose
    .connect(process.env.dbName, {
      useNewUrlParser: true,
      useCreateIndex: true,
      useFindAndModify: false,
      useUnifiedTopology: true,
    })
    .then(() => console.log("Database connected!"))
    .catch((error) => console.log(error));
};
