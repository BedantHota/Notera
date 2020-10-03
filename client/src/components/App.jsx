import React, { useState, useEffect } from "react";
import axios from "axios";
import {BrowserRouter as Router, Switch, Route, Link} from "react-router-dom";
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
            key={noteItem._id}
            id={noteItem._id}
            title={noteItem.title}
            content={noteItem.content}
            onDelete={deleteNote}
            noteId={noteItem._id}
          />
        );
      })
    );
  }

  return (
    <div>
      <Header />
      <Router>
      <Switch>
      <Route exact path="/">
      <CreateArea onAdd={addNote} />
      <NoteList />
      </Route>
      <Route path="/reminder">
      <Reminder/>
      </Route>
      <Route path="/trash">
      <Trash/>
      </Route>
      </Switch>
      </Router>
      <Footer />
      
    </div>
  );
}

export default App;
