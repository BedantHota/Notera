import React, {useEffect, useState} from "react";
import axios from "axios";
import Note from "./Note";

function Trash(){
    const [notes, setNotes] = useState([]);

    useEffect(() => {
        axios
            .get('http://localhost:5000/trash')
            .then(res => {
                setNotes(res.data);
            });
    },[]);

    function NoteList() {
        return (
          notes.map((noteItem) => {
            return (
              <Note
                key={noteItem._id}
                id={noteItem._id}
                title={noteItem.title}
                content={noteItem.content}  
                route="/trash"
                noteId={noteItem._id}    
              />
            );
          })
        );
      }

    return(
        <div>
            <NoteList/>
        </div>
    )
}
export default Trash;   