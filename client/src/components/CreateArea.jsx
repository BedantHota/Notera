import React, { useState } from "react";
import AddAlertIcon from "@material-ui/icons/AddAlert";
import ImageIcon from "@material-ui/icons/Image";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import Zoom from "@material-ui/core/Zoom";
import http from "../libs/http";

function CreateArea(props) {
  const [isClicked, setClick] = useState(false);

  const [note, setNote] = useState({
    title: "",
    content: "",
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
    });

    http.post("/api", note).then((res) => {
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
          <AddAlertIcon fontSize="small" />
        </button>
        <button
          style={{ display: isClicked ? "initial" : "none" }}
          className="icon"
        >
          <ImageIcon fontSize="small" />
        </button>
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
