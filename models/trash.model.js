const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const trashSchema = new Schema({
    title: String,
    content: String
});

const Trash = mongoose.model("Trash", trashSchema);

module.exports = Trash;