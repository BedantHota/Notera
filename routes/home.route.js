const express = require("express");
const mongoose = require("mongoose");
const Note = require("../models/note.model.js");
const router = express.Router();

router.get("/", (req, res) => {
    Note.find()
        .then(notes => res.json(notes))
        .catch(err => res.status(400).json("Error: " + err));
});

router.post("/", (req, res) => {
    const note = req.body;
    const newNote = new Note({ title: note.title, content: note.content });

    newNote.save(function (err) {
        if (err) {
            console.log(err);
        } else {
            console.log("Document inserted successfully");
        }
    })
});

router.delete("/", (req, res) => {
    const idWeGotFromReact = req.body.noteId;
    Note.findByIdAndDelete(idWeGotFromReact, (err, docs) => {
        if (err) {
            console.log(err);
        } else {
            console.log("Deleted Document");
        }
    })
})

module.exports = router;
