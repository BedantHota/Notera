const express = require("express");
const mongoose = require("mongoose");
const Reminder = require("../models/reminder.model.js");
const router = express.Router();
const path = require('path');

router.get("/", (req, res) => {
    res.sendFile(path.resolve(__dirname, '../client', 'build', 'index.html'));
    Reminder.find({})
        .then(notes => res.json(notes))
        .catch(err => res.status(400).json("Error: " + err));
});

router.post("/", (req, res) => {
    const newReminder = new Reminder({
        title: req.body.title,
        content: req.body.content,
        date: req.body.dateAndTime
    })

    newReminder.save()
        .then(() => res.json(newReminder))
        .catch(err => res.status(400).json("Error: " + err));
});

router.delete("/", (req, res) => {
    const idWeGotFromReact = req.body.noteId;

    Reminder.findByIdAndDelete(idWeGotFromReact)
        .then(() => res.json("Note Deleted"))
        .catch(err => res.status(400).json('Error: ' + err));

});

// router.put("/", (req, res) => {

// });

module.exports = router;
