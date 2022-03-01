import React from 'react';
import {Button, Col, Container, Form, Row} from "react-bootstrap";

const Login = () => {
    return (
        <>
            <Container>
                <h1 className="shadow-sm text-success mt-5 p-3 text-center rounded">Login</h1>
                <Row className="mt-5">
                    <Col lg={5} md={6} sm={12} className="p-5 m-auto shadow-sm rounded-lg">
                        <Form>
                            <Form.Group controlId="formBasicEmail">
                                <Form.Label>Email address</Form.Label>
                                <Form.Control type="email" placeholder="Email Address" pattern="^\S+@\S+\.\S+$/" />
                            </Form.Group>

                            <Form.Group controlId="formBasicPassword">
                                <Form.Label>Password</Form.Label>
                                <Form.Control type="password" placeholder="Password" pattern="^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$" />
                                <Form.Text className="text-muted">
                                    Minimum eight characters, at least one uppercase letter, one lowercase letter and one number.
                                </Form.Text>
                            </Form.Group>

                            <Button variant="success btn-block" type="submit">
                                Login
                            </Button>
                        </Form>
                    </Col>
                </Row>
                <h6 className="mt-5 p-5 text-center text-secondary ">Copyright © 2022 Ali Srour. All Rights Reserved.</h6>
            </Container>
        </>
    );
};

export default Login;
