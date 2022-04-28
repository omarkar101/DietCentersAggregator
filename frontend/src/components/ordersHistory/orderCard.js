import React from "react";
import { Card } from "react-bootstrap";
import styled from "styled-components";

const OrderCard = (props) => {
  const {
    orderid,
    cardtext,
    serviceprovider,
    datesent,
    ordername,
    footer
  } = props;

  return (
      <Card style={{margin: "auto", minWidth: '600px', borderStyle: "solid", borderWidth: 2, borderColor: "#21ad83"}}>

       
        <Out>
        <img style={{width: "100px", height: "100px"}} src="https://pinchofyum.com/wp-content/uploads/spaghetti-9-819x1024.jpg"/>
        <In>
        <Card.Body>
          <Card.Title>Meal ordered: {ordername}</Card.Title>
          <Card.Title></Card.Title>
          <Card.Text>
            {cardtext}
          </Card.Text>
        </Card.Body>
        </In>
        </Out>
        <Card.Footer style={{ backgroundColor: "#bce6d988"}}>
          <small className="text-muted">Date sent: {datesent}</small>
        </Card.Footer>

      </Card>
  );
};

const Out = styled.div`
display: flex;
height: 100%;
`;

const In = styled.div`
  display: inline-block;
  height: 100%;
`;

export default OrderCard;
