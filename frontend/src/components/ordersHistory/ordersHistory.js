import React from "react";
import OrderCard from "./orderCard";
import "./ordersHistory.css";
import { Col } from "react-bootstrap";


const OrdersHistory = () => {
  return (
    <div className="orders">
        <h1>Your Orders</h1>
        {Array.from({ length: 4 }).map((_, idx) => (
            <Col className="orders-card">
                <OrderCard />
            </Col>
        ))}
    </div>
  );
};

export default OrdersHistory;