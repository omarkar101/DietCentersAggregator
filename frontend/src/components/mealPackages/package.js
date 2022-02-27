import React from "react";
import { Col } from "react-bootstrap";

const Package = () => {
  return (
    <div className="orders">
      <h1></h1>
      {Array.from({ length: 4 }).map((_, idx) => (
        <Col className="orders-card">
          
        </Col>
      ))}
    </div>
  );
};

export default Package;
