import React from "react";
import axios from 'axios';
import DeleteIcon from '@material-ui/icons/Delete';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';
import RestoreIcon from '@material-ui/icons/Restore';
// import Snackbar from '@material-ui/core/Snackbar';
// import IconButton from '@material-ui/core/IconButton';
// import CloseIcon from '@material-ui/icons/Close';

function Note(props) {
  const [open, setOpen] = React.useState(false);
  // const [openPop, setOpenPop] = React.useState(false);
  const [isClicked, setClick] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const restoreButton = () => {
    setOpen(true);
    setClick(true);
  }

  const handleClickClose = () => {
    setOpen(false);
  };

  // const handlePop = (event, reason) => {
  //   if (reason === 'clickaway') {
  //     return;
  //   }

  //   setOpenPop(false);
  // }

  function handleClick() {
    // setOpenPop(true);
    setOpen(false);
    const id = props.noteId;
    props.onDelete(id);
    axios({
      method: 'delete',
      url: "/api" + props.route,
      data: {
        noteId: id
      }
    });
  };

  function handleRestore() {
    // setOpenPop(true);
    setOpen(false);
    setClick(false);
    const id = props.noteId;
    props.onRestore(id);
    axios({
      method: 'delete',
      url: "/api" + props.route,
      data: {
        noteId: id
      }
    });
  };

  function handleChange(event) {
    console.log(event.target.value);
  };

  return (
    <div className={props.className} style={props.customStyles}>
      <h1>{props.title}</h1>
      <p style={{ marginBottom: props.route === "/reminder" ? "35px" : null }}>{props.content}</p>
      { props.route === "/reminder" ? <TextField
        onChange={handleChange}
        id="datetime-local"
        name="dateAndTime"
        label="Set Reminder"
        type="datetime-local"
        defaultValue={props.dateAndTime}               //2020-05-24T10:30
        className="textField"
        InputLabelProps={{
          shrink: true,
        }}
      /> : null}
      {
        props.route === "/trash" ? <button style={{ marginTop: props.route === "/reminder" ? "10px" : null }} name={props.noteId} onClick={restoreButton}>
          <RestoreIcon />
        </button> : null
      }
      <button style={{ marginTop: props.route === "/reminder" ? "10px" : null }} name={props.noteId} onClick={handleClickOpen}>
        <DeleteIcon />
      </button>
      <Dialog
        style={{ position: "absolute" }}
        className="dialog-box"
        open={open}
        onClose={handleClick}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{props.route === "/reminder" ? "Do you want to delete this Reminder ?" : isClicked ? "Do you want to restore this note ?" : "Do you want to delete this Note ?"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {
              isClicked ? "Note: All the notes or reminders restored will be available in notes." : props.route === "/trash" ? "This will permanently delete the note." :
                `This ${props.route === "/reminder" ? "Reminder" : "Note"} will still be available in the Trash. You can restore or delete them from there.`
            }
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={isClicked ? handleRestore : handleClick} color="primary" autoFocus>
            Yes
          </Button>
          <Button onClick={handleClickClose} color="primary" autoFocus>
            No
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default Note;