const express = require("express");
const mongoose = require("mongoose");
const Note = require("../models/note.model.js");
const router = express.Router();
const path = require('path');

router.use(express.static('client/build'));
router.get("/", (req, res) => {
    res.sendFile(path.resolve(__dirname, '../client/build/index.html'));
    Note.find({})
        .then(notes => res.json(notes))
        .catch(err => res.status(400).json("Error: " + err));
});

router.post("/", (req, res) => {
    const note = req.body;
    const newNote = new Note(note);

    newNote.save()
        .then(() => res.json(newNote))
        .catch(err => res.status(400).json("Error: " + err));
});

router.delete("/", (req, res) => {
    const idWeGotFromReact = req.body.noteId;

    Note.findByIdAndDelete(idWeGotFromReact)
        .then(() => res.json("Note Deleted"))
        .catch(err => res.status(400).json('Error: ' + err));

});

module.exports = router;
