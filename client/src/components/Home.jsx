import React from "react";
import { Link } from "react-router-dom";
import { Button, Container, Col, Row } from "react-bootstrap";
import SvgNote from "./SvgNote";
import SvgReminder from "./SvgRemi";
import GitHubIcon from '@material-ui/icons/GitHub';
import FacebookIcon from '@material-ui/icons/Facebook';
import InstagramIcon from '@material-ui/icons/Instagram';
import TwitterIcon from '@material-ui/icons/Twitter';
import "../home.css";

function Home() {
    return (
        <>
            <Container>
                <nav className="nav-bar">
                    <p className="logo-nav">Notera</p>
                    <div className="btns">
                        <a className="btn-log" href="/login">Login</a> <Button href="/signup" type="button" className="btn-sign">Sign Up</Button>
                    </div>
                </nav>
            </Container>
            <div className="main">
                <Row>
                    <Col lg={{ span: 6, order: "first" }} md={{ span: 12 }} xs={{ order: "last" }} className="col">
                        <div className="svgnote">
                            <SvgNote />
                        </div>
                    </Col>
                    <Col lg={{ spam: 6, order: "last" }} md={{ span: 12 }} xs={{ order: "first" }} className="col">
                        <div className="textLeft">
                            <p className="heading-text">Simplest Way to take Notes.</p>
                            <p className="body-text">Notera is a simple notes and reminders taking app. Do it all at one place.</p>
                            <Button href="/login" className="link-sep" style={{ marginTop: "15px" }} type="button">Get started</Button>
                        </div>
                    </Col>
                </Row>
                <Row>
                    <Col lg={{ span: 6 }} md={{ span: 12 }} className="col">
                        <div className="textRight">
                            <p className="heading-text">Get Notified Always.</p>
                            <p className="body-text">Set reminers to your notes and get
                                notified via push notifications or mail.</p>
                        </div>
                    </Col>
                    <Col lg={{ span: 6 }} md={{ span: 12 }} className="col">
                        <div className="svgnote">
                            <SvgReminder />
                        </div>
                    </Col>
                </Row>
                <Row style={{ marginTop: "30px" }}>
                    <Col lg={{ span: 6 }} md={{ span: 12 }}>
                        <div className="github">
                            <div>
                                <p>Want to contribute ? <br />
                                Fork the repo now!
                                </p>
                                <a style={{ color: "black" }} href="https://github.com/BedantHota/Notera">
                                    <GitHubIcon fontSize="large" />
                                </a>
                            </div>
                        </div>
                    </Col>
                    <Col lg={{ span: 6 }} md={{ span: 12 }}>
                        <div className="mid-footer">
                            <p>Get Started Now!</p>
                            <Button href="/login" type="button" className="btn-log">Log In</Button> or <Button href="/signup" type="button" className="btn-sign">Sign Up</Button>
                        </div>
                    </Col>
                </Row>
                <div className="footer">
                    <p className="contact">Get in Touch with us on</p>
                    <div className="icon-set">
                        <a href="#"><FacebookIcon fontSize="large" /></a>
                        <a href="#"><InstagramIcon fontSize="large" /></a>
                        <a href="#"><TwitterIcon fontSize="large" /></a>
                    </div>
                    <br />
                    <p>Made with love <span>❤</span> by Focuss</p>
                </div>
            </div>
        </>
    )
}

export default Home;