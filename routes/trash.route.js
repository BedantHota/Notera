const express = require("express");
const Trash = require("../models/trash.models.js");
const Note = require("../models/note.model.js");
const router = express.Router();

router.get("/", (req,res) => {
    Trash.find({})
        .then((notes) => res.json(notes))
        .catch((err) => res.status(400).json("Error: " + err)); 
});

router.post("/", (req,res) => {
    const trashedNote = req.body.id;
    Note.findById(trashedNote, (err, docs) => {
        if(err){
            console.log("Error: " + err);
        } else{
            const note = {
                title: docs.title,
                content: docs.content
            }
            const newNote = new Trash(note);
            newNote.save()
                .then(() => res.json("Inserted To the Trash"))
                .catch((err) => console.log(err));
        }
    });
    
});

router.delete("/", (req,res) => {
    const idWeGotFromReact = req.body.noteId;
    Trash.findByIdAndDelete(idWeGotFromReact)
        .then(() => res.json("Note Deleted"))
        .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;