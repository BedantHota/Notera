import React from "react";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import Form from "react-bootstrap/Form";
import MenuIcon from '@material-ui/icons/Menu';
import NoteAddIcon from '@material-ui/icons/NoteAdd';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import SvgDark from "./SvgDark";
import TemporaryDrawer from "./MenuBar";
import "../header.css";

function Header(props) {
  return (
    <header>
      <Navbar bg="white" variant="light">
        <TemporaryDrawer />
        <Form inline className="search-bar">
          <input placeholder="Search All Notes.."></input>
        </Form>
        <button className="headerIcon addNoteIcon"><NoteAddIcon fontSize="default" /></button>
        <Nav className="ml-auto mr-auto">
          <div className="headerLogo">Notera</div>
        </Nav>
        <Nav className="ml-auto">
          <button className="headerIcon darkmodeIcon"><SvgDark /></button>
          <button className="headerIcon accountIcon"><AccountCircleIcon fontSize="large" /></button>
        </Nav>
      </Navbar>
    </header>
  )
}

export default Header;