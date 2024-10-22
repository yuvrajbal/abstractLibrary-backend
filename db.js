const mongoose = require("mongoose");
require("dotenv").config();

// define schema and object id
const Schema = mongoose.Schema;

// connect to mongodb
mongoose.connect(process.env.MONGODB_URL);

// define a summary schema
const summarySchema = new Schema({
  title: String,
  imageUrl: String,
  summaryUrl: String,
  author: String,
});

const adminSchema = new Schema({
  username: { type: String },
  password: String,
});

const summaryModel = mongoose.model("summary", summarySchema);
const adminModel = mongoose.model("admin", adminSchema);

module.exports = {
  summaryModel,
  adminModel,
};
