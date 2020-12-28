import React, { useEffect } from "react";
import Note from "./Note";
import CreateNote from "./CreateNote";
import "../notesPanel.css";
import AddIcon from "@material-ui/icons/Add";
import DeleteIcon from '@material-ui/icons/Delete';
import InfoOutlinedIcon from '@material-ui/icons/InfoOutlined';
import GetAppRoundedIcon from '@material-ui/icons/GetAppRounded';

function NotesPanel() {
    return (
        <div className="app-layout">
            <div className="notesPanel">
                <div className="note-list-items">
                    <div className="sort">
                        <select className="sortbySelect">
                            <option value="recent">Recently Viewed</option>
                            <option value="aplhabetical">A-Z</option>
                            <option value="date">By Date</option>
                        </select>
                    </div>
                    <Note />
                </div>
            </div>
            <div className="right">
                <div className="create-note-above-icons">
                    <button className="icon"><GetAppRoundedIcon /></button>
                    <button className="icon"><DeleteIcon /></button>
                    <button className="icon"><InfoOutlinedIcon /></button>
                </div>
                <CreateNote />
                <button className="addIcon"><AddIcon /></button>
            </div>
        </div>
    )
}

export default NotesPanel;