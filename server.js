const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const { urlencoded } = require('body-parser');
const cors = require("cors");

const app = express();

// IMPORT Models
require("./models/note.model.js");

// Connecting to MongoDB
mongoose.Promise = global.Promise;
mongoose.connect(process.env.MONGODB_URI || `mongodb://localhost:27017/KeeperApp`, {useNewUrlParser: true, useUnifiedTopology: true});

const connection = mongoose.connection;
connection.once('open', () => {
  console.log("MongoDB database connection established successfully");
})

// Setting up server
app.use(bodyParser.json({urlencoded: true}));
app.use(cors({
    origin: "http://localhost:3000"
}));

app.use("/",require("./routes/home.route.js"));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`app running on port ${PORT}`)
});