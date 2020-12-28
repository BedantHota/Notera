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
    <div className="note">
      <p className="title">Madame Dolores</p>
      <p className="content">Madame Dolores lorem ispum mad...</p>
    </div>
  );
}

export default Note;