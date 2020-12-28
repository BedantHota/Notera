import React, { useState } from "react";
import clsx from "clsx";
import { makeStyles } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import Button from 'react-bootstrap/Button';
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import MenuIcon from "@material-ui/icons/Menu";
import HighlightIcon from "@material-ui/icons/Highlight";
import DeleteIcon from "@material-ui/icons/Delete";
import SettingsIcon from '@material-ui/icons/Settings';
import { Link, useHistory } from 'react-router-dom';
import { useAuth } from '../Contexts/AuthContext';

const useStyles = makeStyles({
    list: {
        width: 250
    },
    fullList: {
        width: "auto"
    }
});

export default function TemporaryDrawer() {
    const [error, setError] = useState('');
    const classes = useStyles();
    const [state, setState] = React.useState({
        left: false
    });
    const { logout } = useAuth();
    const history = useHistory();

    async function handleLogout() {
        setError('');

        try {
            await logout()
            history.push('/home');
        } catch {
            setError('Failed to loout');
        }
    }

    const toggleDrawer = (anchor, open) => (event) => {
        if (
            event.type === "keydown" &&
            (event.key === "Tab" || event.key === "Shift")
        ) {
            return;
        }

        setState({ ...state, [anchor]: open });
    };

    const list = (anchor) => (
        <div
            className={clsx(classes.list, {
                [classes.fullList]: anchor === "top" || anchor === "bottom"
            })}
            role="presentation"
            onClick={toggleDrawer(anchor, false)}
            onKeyDown={toggleDrawer(anchor, false)}
        >
            <div style={{ marginTop: "20px" }}>
                <h4>Notera</h4>
            </div>
            <hr />
            <List>
                <Link className="link" to="/">
                    <ListItem button key="Notes">
                        <ListItemIcon>
                            <HighlightIcon />
                        </ListItemIcon>
                        <ListItemText primary="Notes" />
                    </ListItem>
                </Link>
                <Link className="link" to="/trash">
                    <ListItem button key="Trash">
                        <ListItemIcon>
                            <DeleteIcon />
                        </ListItemIcon>
                        <ListItemText primary="Trash" />
                    </ListItem>
                </Link>
            </List>
            <hr />
            <List style={{ marginTop: "40vh" }}>
                <hr style={{ marginBottom: "0" }} />
                <ListItem button key="Settings">
                    <ListItemIcon>
                        <SettingsIcon />
                    </ListItemIcon>
                    <ListItemText primary="Settings" />
                </ListItem>
                <hr style={{ marginTop: "0" }} />
            </List>
            <div style={{ textAlign: "center" }}>
                <Button variant="primary" onClick={handleLogout}>
                    Logout
                </Button>
            </div>
        </div>
    );

    return (
        <div>
            <React.Fragment>
                <button onClick={toggleDrawer("left", true)} className="headerIcon menuIcon" href="#home"><MenuIcon fontSize="large" /></button>
                <Drawer
                    anchor="left"
                    open={state["left"]}
                    onClose={toggleDrawer("left", false)}
                >
                    {list("left")}
                </Drawer>
            </React.Fragment>
        </div>
    );
}
