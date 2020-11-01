import React, { useState } from "react";
import axios from "axios";
import Zoom from "@material-ui/core/Zoom";
// import DatePicker from "./DatePicker.jsx";
import TextField from '@material-ui/core/TextField';


function CreateArea(props) {
    const [isClicked, setClick] = useState(false);
    const currentDate = new Date();

    const [note, setNote] = useState({
        title: "",
        content: "",
        dateAndTime: ""
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
            content: "",
            dateAndTime: ""
        });

        axios
            .post('/api/reminder', note)
            .then(res => {
                props.onAdd(res.data);
            });
    }

    return (
        <div>
            <form className={props.formClassName} action="/" method="post">
                {isClicked ? <input
                    name="title"
                    onChange={handleChange}
                    value={note.title}
                    placeholder="Title"
                /> : null}
                <textarea
                    onClick={handleClick}
                    name="content"
                    onChange={handleChange}
                    value={note.content}
                    placeholder="Take a note..."
                    rows="3"
                />
                {isClicked ? <TextField
                    onChange={handleChange}
                    id="datetime-local"
                    name="dateAndTime"
                    label="Set Reminder"
                    type="datetime-local"
                    defaultValue={`${currentDate.getFullYear}-${currentDate.getMonth}-${currentDate.getDate}T${currentDate.getHours}:${currentDate.getMinutes}`}                //2020-05-24T10:30
                    className="textField"
                    InputLabelProps={{
                        shrink: true,
                    }}
                /> : null}
                <Zoom in={isClicked ? true : false}>
                    <button className="button" onClick={submitNote}>+</button>
                </Zoom>
            </form>
        </div>
    );
}

export default CreateArea;