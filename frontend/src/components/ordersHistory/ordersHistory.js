import React from "react";
import styled from "styled-components";
import OrderCard from "./orderCard";
import "./ordersHistory.css";
import { Col } from "react-bootstrap";

const OrdersHistory = () => {
  return (
    <Container>
      <h1 className="shadow-sm text-black-50 p-3 text-center rounded">
        Your Orders
      </h1>
      <div className="orders">
        {Array.from({ length: 7 }).map((_, idx) => (
          <Col key={idx} className="orders-card">
            <OrderCard orderid={idx} text={"a description of the order"} serviceprovider={"service " + idx} footer={idx+1 + " mins ago."}/>
          </Col>
        ))}
      </div>
    </Container>
  );
};

const Container = styled.div`
  position: relative;
  align-self: center;
  max-height: initial;
  box-sizing: inherit;
  font-weight: 300;
  margin: 100px;
`;

export default OrdersHistory;
