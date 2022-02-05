import React from "react";
import { Card } from "react-bootstrap";

const OrderCard = () => {
  return (
      <Card>
        <Card.Img variant="top" src="" alt="image" width='100%' height={100} />
        <Card.Body>
          <Card.Title>Card title</Card.Title>
          <Card.Text>
            This is a wider card with supporting text below as a natural lead-in
            to additional content. This content is a little bit longer.
          </Card.Text>
        </Card.Body>
        <Card.Footer>
          <small className="text-muted">Last updated 3 mins ago</small>
        </Card.Footer>
      </Card>
  );
};

export default OrderCard;
