import React, { useState } from "react";
import axios from "axios";

function CreateArea(props) {
  const [note, setNote] = useState({
    title: "",
    content: ""
  });

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
    setNote({
      title: "",
      content: ""
    });
    event.preventDefault();

    axios
      .post('http://localhost:5000', note)
      .then(res => {
        console.log(res);
        console.log(res.data);
      });  
  }

  return (
    <div>
      <form action="/" method="post">
        <input
          name="title"
          onChange={handleChange}
          value={note.title}
          placeholder="Title"
        />
        <textarea
          name="content"
          onChange={handleChange}
          value={note.content}
          placeholder="Take a note..."
          rows="3"
        />
        <button className="button" name={props.name} onClick={submitNote}>Add</button>
      </form>
    </div>
  );
}

export default CreateArea;
