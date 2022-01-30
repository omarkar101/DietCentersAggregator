import React from "react";
import LeftSide from "../login/leftSide";
import RightSide from "../login/rightSide";

const SignUp = () => {
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

export default SignUp