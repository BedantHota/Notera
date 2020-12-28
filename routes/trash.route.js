const express = require("express");
const Trash = require("../models/trash.model.js");
const Note = require("../models/note.model.js");
const router = express.Router();

router.get("/", (req, res) => {
    Trash.find({})
        .then((notes) => res.json(notes))
        .catch((err) => res.status(400).json("Error: " + err));
});

router.post("/", (req, res) => {
    const trashedNote = req.body.id;
    // const givenRoute = req.body.route;

    Note.findById(trashedNote, (err, doc) => {
        if (err) {
            console.log(err);
        } else {
            const note = {
                title: doc.title,
                content: doc.content
            }
            const newTrash = new Trash(note);
            newTrash.save()
                .then(() => res.json(note))
                .catch((err) => console.log(err));
        }
    });
});

router.post("/deleteReminder", (req, res) => {
    const trashedReminder = req.body.id;

    Reminder.findById(trashedReminder, (err, docs) => {
        if (err) {
            console.log(err);
        } else {
            const reminder = {
                title: docs.title,
                content: docs.content,
                date: docs.date
            };
            const newReminderTrash = new Trash(reminder);
            newReminderTrash.save()
                .then(() => res.json("Inserted To the Trash"))
                .catch((err) => console.log(err));
        }
    });
});

router.put("/", (req, res) => {
    const noteIdToRestore = req.body.id;
    Trash.findById(noteIdToRestore, (err, doc) => {
        if (err) {
            console.log(err);
        } else {
            const restoredNote = {
                _id: doc._id,
                title: doc.title,
                content: doc.content
            };
            const setRestoreNote = new Note(restoredNote);
            setRestoreNote.save()
                .then(() => res.json(restoredNote))
                .catch((err) => console.log(err));
        }
    });
});

router.delete("/", (req, res) => {
    const idWeGotFromReact = req.body.noteId;
    Trash.findByIdAndDelete(idWeGotFromReact)
        .then(() => res.json("Note Deleted"))
        .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;