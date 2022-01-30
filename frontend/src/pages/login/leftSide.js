import React from 'react';
import {Form, Button} from 'react-bootstrap';

const LeftSide = () => {
    return (
        <div>
            <Form style={{width:"80%", marginLeft:"10%", marginTop:"10%"}}>
                <Form.Group >
                    <Form.Label>Email Address</Form.Label>
                    <Form.Control type="email" placeholder="Email Address..." />
                </Form.Group>
                <Form.Group >
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" placeholder="Password..." />
                </Form.Group>
                <Button type="submit">Submit</Button>
            </Form>
        </div>
    );
};

export default LeftSide;