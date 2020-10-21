import React, { useState } from "react";
import axios from "axios";
import Zoom from "@material-ui/core/Zoom";

function CreateArea(props) {
  const [isClicked, setClick] = useState(false);

  const [note, setNote] = useState({
    title: "",
    content: ""
  });

  function handleClick() {
    setClick(true);
  }

  function handleChange(event) {
    const { name, value } = event.target;

    setNote(prevNote => {
      return {
        ...prevNote,
        [name]: value
      };
    });
  }

  function submitNote(event) {
    event.preventDefault();
    setNote({
      title: "",
      content: ""
    });

    axios
      .post('http://localhost:5000', note)
      .then(res => {
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
        <Zoom in={isClicked ? true : false}>
          <button className="button" onClick={submitNote}>+</button>
        </Zoom>
      </form>
    </div>
  );
}

export default CreateArea;
