import React, { useState, useEffect } from "react";
import axios from "axios";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";
import Note from "./Note";
import CreateArea from "./CreateArea";
import Trash from "./Trash";
import Reminder from "./Reminder";

function App() {
  const [notes, setNotes] = useState([]);

  useEffect(() => {
    axios
      .get('http://localhost:5000')
      .then(res => {
        setNotes(res.data);
      });
  }, []);


  function addNote(newNote) {
    setNotes(prevNotes => {
      return [...prevNotes, newNote];
    });
  }


  function deleteNote(id) {
    const responseId = {
      id: id
    };

    axios
      .post("http://localhost:5000/trash", responseId)
      .then(res => {
        console.log(res.data);
      });

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
            onDelete={deleteNote}
            route="/"
            noteId={noteItem._id}
          />
        );
      })
    );
  }

  return (
    <Router>
      <div>
        <Header />
        <div className="main-center">
          <Switch>
            <Route path="/" exact>
              <CreateArea formClassName="create-note" onAdd={addNote} />
              <NoteList />
            </Route>
            <Route path="/reminder">
              <Reminder />
            </Route>
            <Route path="/trash">
              <Trash doRestoration={addNote} />
            </Route>
          </Switch>
        </div>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
