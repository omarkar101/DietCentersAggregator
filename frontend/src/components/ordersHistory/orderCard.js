import React from "react";
import { Card } from "react-bootstrap";

const OrderCard = (props) => {
  const {
    orderid,
    cardtext,
    serviceprovider,
    footer
  } = props;

  return (
      <Card style={{margin: "auto", minWidth: '600px', borderStyle: "solid", borderWidth: 2, borderColor: "#21ad83"}}>
        <Card.Body>
          <Card.Title>Order ID: {orderid}</Card.Title>
          <Card.Title>Service Provider: {serviceprovider}</Card.Title>
          <Card.Text>
            {cardtext}
          </Card.Text>
        </Card.Body>
        <Card.Footer style={{ backgroundColor: "#bce6d988"}}>
          <small className="text-muted">Last Updated: {footer}</small>
        </Card.Footer>
      </Card>
  );
};

export default OrderCard;
