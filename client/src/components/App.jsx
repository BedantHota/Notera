import React, { useState, useEffect } from "react";
import axios from "axios";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
// import { Container } from "react-bootstrap"
import Trash from "./Trash";
import SignUp from "./SignUp";
import Login from "./Login";
import { AuthProvider } from "../Contexts/AuthContext";
import Home from "./Home";
import Footer from "./Footer";
import Dashboard from "./Dashboard";

function App() {
  const [notes, setNotes] = useState(null);
  const [open, setOpen] = useState(false);
  const [isClicked, setClick] = useState(false);

  useEffect(() => {
    axios
      .get('/api')
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

  function addNote(newNote) {
    setClick(true);
    setOpen(true);
    setNotes(prevNotes => {
      return [...prevNotes, newNote];
    });
  }


  // function deleteNote(id) {
  //   setClick(false);
  //   setOpen(true);
  //   const responseId = {
  //     id: id
  //   };

  //   axios
  //     .post("/api/trash", responseId)
  //     .then(res => {
  //       console.log(res.data);
  //     });

  //   setNotes(notes => {
  //     return notes.filter((noteItem) => {
  //       return noteItem._id !== id;
  //     });
  //   });
  // }

  // function NoteList() {
  //   return (
  //     notes.map((noteItem) => {
  //       return (
  //         <Note
  //           className="note"
  //           key={noteItem._id}
  //           id={noteItem._id}
  //           title={noteItem.title}
  //           content={noteItem.content}
  //           onDelete={deleteNote}
  //           route="/"
  //           noteId={noteItem._id}
  //         />
  //       );
  //     })
  //   );
  // }

  return (
    <Router>
      <div>
        <div className="main-center">
          <Switch>
            <AuthProvider>
              <Dashboard />
              <Route path="/home">
                <Home />
              </Route>
              <Route path="/login">
                <Login />
                <Footer />
              </Route>
              <Route path="/signup">
                <SignUp />
                <Footer />
              </Route>
              <Route path="/trash">
                <Trash />
              </Route>
            </AuthProvider>
          </Switch>
        </div>
      </div>
    </Router>
  );
}

export default App;