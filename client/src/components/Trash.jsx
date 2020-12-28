import React, { useEffect, useState } from "react";
import Snackbar from "@material-ui/core/Snackbar";
import AddIcon from "@material-ui/icons/Add";
import CreateNote from "./CreateNote";
import axios from "axios";
import Note from "./Note";
import LoadingAnimation from "./LoadingAni";
import NotesPanel from "./NotesPanel";
import Header from "./Header";
import DeleteIcon from '@material-ui/icons/Delete';
import RestoreIcon from '@material-ui/icons/Restore';

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
      <Header />
      <div className="app-layout">
        <div className="notesPanel">
          <div className="note-list-items">
            <div className="sort">
              <select className="sortbySelect">
                <option value="recent">Recently Viewed</option>
                <option value="aplhabetical">A-Z</option>
                <option value="date">By Date</option>
              </select>
            </div>
            <Note />
          </div>
        </div>
        <div className="right">
          <div className="create-note-above-icons">
            <button className="icon"><DeleteIcon /></button>
            <button className="icon"><RestoreIcon /></button>
          </div>
          <CreateNote />
        </div>
      </div>
    </div>
  )
}
export default Trash;   