import React, { useState } from "react";
import AddIcon from '@material-ui/icons/Add';
import EditIcon from '@material-ui/icons/Edit';
import AddAlertIcon from '@material-ui/icons/AddAlert';
import axios from "axios";

function CreateNote(props) {
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
            }
        })
    }

    function submitNote(event) {
        event.preventDefault();
        setNote({
            title: "",
            content: ""
        })

        axios
            .post('/api', note)
            .then((res) => {
                console.log(res);
            })
    }

    return (
        <>
            <div className="create-note">
                <form className="input-note" >
                    <input onChange={handleChange} name="title" placeholder="Title" className="title-input" />
                    <textarea onChange={handleChange} name="content" rows="16" placeholder="Content" className="content-input" />
                    <button className="reminderBtn">
                        <AddAlertIcon />
                    </button>
                </form>
            </div>
            {/* <div className="icons">
                <button className="icon" type="submit" onClick={submitNote}><AddIcon /></button>
                <button className="icon"><EditIcon /></button>
            </div> */}
        </>
    )
}

export default CreateNote;