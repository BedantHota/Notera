import React, { useEffect, useState } from "react";
import Snackbar from "@material-ui/core/Snackbar";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import axios from "axios";
import Note from "./Note";

function Trash(props) {
  const [notes, setNotes] = useState(null);
  const [open, setOpen] = useState(false);
  const [isClicked, setClick] = useState(false);

  useEffect(() => {
    axios
      .get('/api/trash')
      .then(res => {
        setNotes(res.data);
      });
  }, []);

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  function restoreNote(id) {
    setClick(true);
    setOpen(true);
    const restoreNoteId = {
      id: id
    }

    axios
      .put("/api/trash", restoreNoteId)
      .then(res => {
        props.doRestoration(res.data);
        console.log(res.data);
        deleteNote(res.data._id);
      });
  }

  function deleteNote(id) {
    setClick(false);
    setOpen(true);
    setNotes(notes => {
      return notes.filter((noteItem) => {
        return noteItem._id !== id;
      });
    });
  }

  function NoteList() {
    return (
      notes.map((noteItem) => {
        return (
          <Note
            className="note"
            key={noteItem._id}
            id={noteItem._id}
            title={noteItem.title}
            content={noteItem.content}
            route="/trash"
            onDelete={deleteNote}
            onRestore={restoreNote}
            noteId={noteItem._id}
          />
        );
      })
    );
  }

  return (
    <div>
      {notes === null ? <p>Loading...</p> : notes.length === 0 ? <div className="centered-image-trash">
        <img src="https://i.ibb.co/9GrNgVg/Screenshot-2020-11-01-195018-removebg-preview.png" alt="Page" />
      </div> : <div className="grid"><NoteList /></div>}
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
        message={isClicked ? "Note restored successfully." : "Note was permanently deleted succesfully."}
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
export default Trash;   