import React from "react";
import { Col, Card, Button } from "react-bootstrap";
import ItemCard from "../serviceProvider/itemCard";
import styled from "styled-components";

const item = {
  name: "Kaju Matar Masala",
  price: "AED24",
  description: "Cashews, green peas and tomato masala gravy.",
  imagelink:
    "https://b.zmtcdn.com/data/dish_photos/14d/fc2cd40b2b5a93852f4e1fde9612c14d.jpg?output-format=webp&fit=around|130:130&crop=130:130;*,*",
};

const Package = () => {
  return (
    <BaseContainer>
      <div className="orders">
        <h2>Name of the package</h2>
        <h4>Items inside the package:</h4>
        {Array.from({ length: 4 }).map((_, idx) => (
          <Col className="orders-card">
            <ItemCard item={item} />
          </Col>
        ))}
      </div>
    

      <Card className="text-center" style={{'height': 'fit-content'}}>
        <Card.Header>Summary</Card.Header>
        <Card.Body>
          <Card.Title>esem el plan li bado yeha el user</Card.Title>
          <Card.Text>
              suret el plan li mahtuta
          </Card.Text>
        </Card.Body>
        <Card.Footer className="text-muted">Total
        <Card.Text>
            300$
        </Card.Text>
        </Card.Footer>
      </Card>
    </BaseContainer>
  );
};

const BaseContainer = styled.div`
    width: 80%;
    margin: 0 auto;
    margin-top: 20px;
    display: flex;
`;

export default Package;
