const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const noteSchema = new Schema({
    title: { type: String }, // String is shorthand for {type: String}
    content: { type: String }
}, { timestamps: true });

const Note = mongoose.model("Note", noteSchema);

module.exports = Note;