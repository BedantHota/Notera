import React, { useState } from "react";
import Zoom from "@material-ui/core/Zoom";
import ImageIcon from "@material-ui/icons/Image";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import TextField from "@material-ui/core/TextField";
import http from "../libs/http";

function CreateArea(props) {
  const [isClicked, setClick] = useState(false);
  const currentDate = new Date();

  const [note, setNote] = useState({
    title: "",
    content: "",
    dateAndTime: "",
  });

  function handleClick() {
    setClick(true);
  }

  function handleChange(event) {
    const { name, value } = event.target;

    setNote((prevNote) => {
      return {
        ...prevNote,
        [name]: value,
      };
    });
  }

  function submitNote(event) {
    event.preventDefault();
    setNote({
      title: "",
      content: "",
      dateAndTime: "",
    });

    http.post("/api/reminder", note).then((res) => {
      props.onAdd(res.data);
    });
  }

  return (
    <div>
      <form className={props.formClassName} action="/" method="post">
        {isClicked ? (
          <input
            name="title"
            onChange={handleChange}
            value={note.title}
            placeholder="Title"
          />
        ) : null}
        <textarea
          onClick={handleClick}
          name="content"
          onChange={handleChange}
          value={note.content}
          placeholder="Take a note..."
          rows="3"
        />
        {isClicked ? (
          <TextField
            onChange={handleChange}
            id="datetime-local"
            name="dateAndTime"
            label="Set Reminder"
            type="datetime-local"
            defaultValue={`${currentDate.getFullYear}-${currentDate.getMonth}-${currentDate.getDate}T${currentDate.getHours}:${currentDate.getMinutes}`} //2020-05-24T10:30
            className="textField"
            InputLabelProps={{
              shrink: true,
            }}
          />
        ) : null}
        {isClicked ? (
          <div className="icon-reminder">
            <button
              style={{ display: isClicked ? "initial" : "none" }}
              className="icon"
            >
              <MoreVertIcon fontSize="small" />
            </button>
            <button
              style={{ display: isClicked ? "initial" : "none" }}
              className="icon"
            >
              <ImageIcon fontSize="small" />
            </button>
          </div>
        ) : null}
        <Zoom in={isClicked ? true : false}>
          <button className="button" onClick={submitNote}>
            +
          </button>
        </Zoom>
      </form>
    </div>
  );
}

export default CreateArea;
