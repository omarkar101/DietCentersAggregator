import React from "react";
import {Row, Col} from 'react-bootstrap';
import LeftSide from "./leftSide";
import RightSide from "./rightSide";

const SignUp = () => {
    return (
        <div className="App">
            <div>
                Sign Up
            </div>
            <Row className="landing">
                <Col ><LeftSide /></Col>
                
                <Col ><RightSide /></Col>
            </Row>
        </div>
      );
}

export default SignUp