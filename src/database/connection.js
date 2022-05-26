const mongoose = require("mongoose");
require("dotenv").config();

mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true });

mongoose.connection
  .once("open", () => console.log("Database Connected"))
  .on("error", error => {
    console.log("Your Error", error);
  });

module.exports = mongoose;