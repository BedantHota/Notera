import React, { useRef, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { useAuth } from "../Contexts/AuthContext";
import { Form, Button, Row, Col, Card, Container, Alert } from "react-bootstrap";
import "../LoginSignup.css";

function SignUp() {
    const emailRef = useRef();
    const passwordRef = useRef();
    const { login, currentUser } = useAuth();
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const history = useHistory();

    async function handleSubmit(e) {
        e.preventDefault();

        try {
            setLoading(true);
            setError('');
            await login(emailRef.current.value, passwordRef.current.value);
            history.push("/");
        } catch {
            setError('Failed to create an account.');
        }

        setLoading(false);
    }

    return (
        <>
            <Container>
                <Row>
                    <Col lg={6} style={{ textAlign: "center" }}>
                        <div className="class-logo">
                            <p className="logo">Notera</p>
                            <p className="slogan-text">Do all at one place <br /> Access your notes everywhere</p>
                        </div>
                    </Col>
                    <Col lg={6} >
                        <Card className="card-login" style={{ maxWidth: "370px", borderRadius: "15px" }}>
                            <Card.Body>
                                {error && <Alert variant="danger">{error}</Alert>}
                                <Form onSubmit={handleSubmit}>
                                    <Form.Control ref={emailRef} type="email" placeholder="Enter your email address:" required />
                                    <Form.Control ref={passwordRef} type="password" placeholder="Password:" required />
                                    <Button disabled={loading} type="submit" style={{ width: "100%" }}>Login</Button>
                                    <div className="text-center">
                                        <p> Want to create an account ? <Link to="/signup">Sign Up</Link> </p>
                                    </div>
                                </Form>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </Container>
        </>
    )
}

export default SignUp;