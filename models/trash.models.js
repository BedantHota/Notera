// const mongoose = require('mongoose');
// const Schema = mongoose.Schema  ;

//   const trashSchema = new Schema({
//     title:  {type: String, required: true}, // String is shorthand for {type: String}
//     content: {type: String, required: true}
//   });

// const TrashNote = mongoose.model("TrashNote", trashSchema);

// module.exports = TrashNote;

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const trashSchema = new Schema({
  title: String,
  content: String
});

const Trash = mongoose.model("Trash", trashSchema);

module.exports = Trash;