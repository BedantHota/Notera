import React, { useEffect, useState } from "react";
import axios from "axios";
import Note from "./Note";

function Trash(props) {
  const [notes, setNotes] = useState([]);

  useEffect(() => {
    axios
      .get('http://localhost:5000/trash')
      .then(res => {
        setNotes(res.data);
      });
  }, []);

  function restoreNote(id) {
    const restoreNoteId = {
      id: id
    }

    axios
      .put("http://localhost:5000/trash", restoreNoteId)
      .then(res => {
        props.doRestoration(res.data);
        console.log(res.data);
        deleteNote(res.data._id);
      });
  }

  function deleteNote(id) {
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
      <NoteList />
    </div>
  )
}
export default Trash;   