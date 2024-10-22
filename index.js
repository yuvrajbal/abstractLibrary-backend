const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const { adminRouter } = require("./routes/admin");
const { getAllSummaries, getSummary } = require("./routes/summary");
require("dotenv").config();
const app = express();
app.use(express.json());
app.use(cors());

app.use("/admin", adminRouter);
app.get("/dashboard", getAllSummaries);
app.get("/summary/:bookId", getSummary);

async function main() {
  await mongoose.connect(process.env.MONGODB_URL);
  app.listen(process.env.PORT, () => {
    console.log("listening on port", process.env.PORT);
  });
}
main();
