const express = require("express");
const mongoose = require("mongoose");
const PORT = process.env.PORT || 8080;

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static("public"));

mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/workout", {
  useNewUrlParser: true,
  // useFindAndModify: true, // Is this to stop the use of a function? TODO:
  useFindAndModify: false,
});

// Requiring our routes
app.use(require("./controllers/htmlController.js"));
app.use(require("./controllers/apiController.js"));

app.listen(PORT, () => {
  console.log(`App running on port ${PORT}!`);
});
