const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const { urlencoded } = require('body-parser');
const cors = require("cors");
const path = require('path');
const app = express();

// IMPORT Models
require("./models/note.model.js");

// Setting up server
app.use(bodyParser.json({ urlencoded: true }));
app.use(cors({
  origin: "http://localhost:3000"
}));

// Connecting to MongoDB
mongoose.Promise = global.Promise;
const uri = 'mongodb+srv://bedant-hota:root@cluster0.ppa1i.mongodb.net/KeeperApp';
mongoose.connect(process.env.MONGODB_URI || uri, { useNewUrlParser: true, useUnifiedTopology: true });

const connection = mongoose.connection;
connection.once('open', () => {
  console.log("MongoDB database connection established successfully");
})

app.use("/", require("./routes/home.route.js"));
app.use("/trash", require("./routes/trash.route.js"));
app.use("/reminder", require("./routes/reminder.route.js"));

// Serve static assests when in production
if (process.env.NODE_ENV === 'production') {
  //set static folder
  app.use(express.static('client/build'));

  //send index.html as response
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`app running on port ${PORT}`)
});
