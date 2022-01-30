import React from "react";
import {Row, Col} from 'react-bootstrap';
import LeftSide from "./leftSide";
import RightSide from "./rightSide";

const Login = () => {
    return (
        <div className="App">
            <div>
                Login
            </div>
            <Row className="landing">
                <Col ><LeftSide /></Col>
                
                <Col ><RightSide /></Col>
            </Row>
        </div>
      );
}
  
export default Login;