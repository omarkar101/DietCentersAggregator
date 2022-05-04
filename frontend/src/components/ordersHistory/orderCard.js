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
    footer,
    description,
    serviceprovidername,
    imgURL
  } = props;

  return (
      <Card style={{margin: "auto", width: "88%", height: "24%" , borderStyle: "solid", borderWidth: 2, borderColor: "#21ad83"}}>

       
        <img style={{width: "100%", height: "18rem"}} src={imgURL}/>
        <Card.Body>
          <Card.Title style={{fontWeight : "900", fontSize: "1.6rem", marginBottom: "1.2rem"}}>{ordername}</Card.Title>
          <Card.Title>{serviceprovidername}</Card.Title>
          <Card.Title>{description}</Card.Title>
          <Card.Text>
            {cardtext}
          </Card.Text>
        </Card.Body>

        <Card.Footer style={{ backgroundColor: "#bce6d988", fontSize: "1.6rem", objectFit: "cover"}}>
          <small className="text-muted">Date: {datesent}</small>
        </Card.Footer>

      </Card>
  );
};

export default OrderCard;
