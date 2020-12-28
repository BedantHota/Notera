import React from "react";
import PrivateRoute from "./PrivateRoute";
import Header from "./Header";
import NotesPanel from "./NotesPanel";

function Dashboard() {
    return (
        <>
            <PrivateRoute exact path="/" component={Header} />
            <PrivateRoute exact path="/" component={NotesPanel} />
        </>
    )
}

export default Dashboard;
