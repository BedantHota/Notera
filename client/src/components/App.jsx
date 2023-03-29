import React, { useState, useEffect } from "react";
import Snackbar from "@material-ui/core/Snackbar";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Header from "./Header";
// import Footer from "./Footer";
import Note from "./Note";
import CreateArea from "./CreateArea";
import Trash from "./Trash";
import Reminder from "./Reminder";
import LoadingAnimation from "./LoadingAni";
import http from "../libs/http";

function App() {
  const [notes, setNotes] = useState(null);
  const [open, setOpen] = useState(false);
  const [isClicked, setClick] = useState(false);

  useEffect(() => {
    http.get("/api").then((res) => {
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
    setNotes((prevNotes) => {
      return [...prevNotes, newNote];
    });
  }

  function deleteNote(id) {
    setClick(false);
    setOpen(true);
    const responseId = {
      id: id,
    };

    http.post("/api/trash", responseId).then((res) => {
      console.log(res.data);
    });

    setNotes((notes) => {
      return notes.filter((noteItem) => {
        return noteItem._id !== id;
      });
    });
  }

  function NoteList() {
    return notes.map((noteItem) => {
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
    });
  }

  return (
    <Router>
      <div>
        <Header />
        <div className="main-center">
          <Switch>
            <Route path="/" exact>
              <CreateArea formClassName="create-note" onAdd={addNote} />
              {notes === null ? (
                <LoadingAnimation />
              ) : notes.length === 0 ? (
                <div className="centered-image">
                  <img
                    src="https://i.ibb.co/Qcvh1t9/Keeper-Notes.png"
                    alt="Page"
                  />
                </div>
              ) : (
                <div className="grid">
                  <NoteList />
                </div>
              )}
              <Snackbar
                style={{ position: "absolute" }}
                className="snackbar"
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "left",
                }}
                severity="success"
                open={open}
                autoHideDuration={4000}
                onClose={handleClose}
                message={
                  isClicked
                    ? "Note added successfully."
                    : "Note deleted succesfully."
                }
                action={
                  <React.Fragment>
                    <IconButton
                      size="small"
                      aria-label="close"
                      color="inherit"
                      onClick={handleClose}
                    >
                      <CloseIcon fontSize="small" />
                    </IconButton>
                  </React.Fragment>
                }
              />
            </Route>
            <Route path="/reminder">
              <Reminder />
            </Route>
            <Route path="/trash">
              <Trash doRestoration={addNote} />
            </Route>
          </Switch>
        </div>
      </div>
    </Router>
  );
}

export default App;
