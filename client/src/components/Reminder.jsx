import React, { useState, useEffect } from "react";
import Snackbar from "@material-ui/core/Snackbar";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import CreateAreaReminder from "./CreateAreaReminder.jsx";
import axios from "axios";
import Note from "./Note.jsx";
import LoadingAnimation from "./LoadingAni";

function Reminder() {

    const [reminder, setReminder] = useState(null);
    const [open, setOpen] = useState(false);
    const [isClicked, setClick] = useState(false);

    useEffect(() => {
        axios
            .get('/api/reminder')
            .then(res => {
                setReminder(res.data);
            });
    }, []);

    const handleClose = (event, reason) => {
        if (reason === "clickaway") {
            return;
        }

        setOpen(false);
    };

    function addReminder(newReminder) {
        setClick(true);
        setOpen(true);
        setReminder(prevReminders => {
            return [...prevReminders, newReminder];
        });
    };

    function deleteNote(id) {
        setClick(false);
        setOpen(true);
        const responseId = {
            id: id
        };

        axios
            .post("/api/trash/deleteReminder", responseId)
            .then(res => {
                console.log(res.data);
            });

        setReminder(reminders => {
            return reminders.filter((reminderItem) => {
                return reminderItem._id !== id;
            });
        });
    };

    function NoteList() {
        return (
            reminder.map((reminderItem) => {
                return (
                    <Note
                        className="reminder"
                        key={reminderItem._id}
                        id={reminderItem._id}
                        noteId={reminderItem._id}
                        title={reminderItem.title}
                        content={reminderItem.content}
                        route="/reminder"
                        dateAndTime={reminderItem.date}
                        onDelete={deleteNote}
                    />
                );
            })
        );
    }

    return (
        <div>
            <CreateAreaReminder formClassName="create-note reminder-input" onAdd={addReminder} />
            {reminder === null ? <LoadingAnimation /> : reminder.length === 0 ? <div className="centered-image-reminder">
                <img alt="page" src="https://i.ibb.co/VMr4Zqw/Screenshot-2020-11-01-194043-removebg-preview.png" />
                <p>Notes with upcoming reminders appear here</p>
            </div> : <div className="grid grid-reminder"><NoteList /></div>}
            <Snackbar
                style={{ position: "absolute" }}
                className="snackbar"
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'left',
                }}
                severity="success"
                open={open}
                autoHideDuration={4000}
                onClose={handleClose}
                message={isClicked ? "Reminder added successfully." : "Reminder deleted succesfully."}
                action={
                    <React.Fragment>
                        <IconButton size="small" aria-label="close" color="inherit" onClick={handleClose}>
                            <CloseIcon fontSize="small" />
                        </IconButton>
                    </React.Fragment>}
            />
        </div>
    )
}

export default Reminder;
