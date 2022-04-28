import React, { useEffect, useState } from "react";
import styled from "styled-components";
import OrderCard from "./orderCard";
import "./ordersHistory.css";
import { Col } from "react-bootstrap";
import {getClientOrderHistory} from "../../api/requests"

const OrdersHistory = () => {
  const [orders, setOrders] = useState([]);
  const formatDate = (inputdate) => {
    let date = new Date(inputdate);
    let formattedDate = ((date.getMonth() > 8) ? (date.getMonth() + 1) : ('0' + (date.getMonth() + 1))) + '/' + ((date.getDate() > 9) ? date.getDate() : ('0' + date.getDate())) + '/' + date.getFullYear()
    return formattedDate;
  }
  console.log('aaaaa')
  useEffect(() => {
    getClientOrderHistory()
      .then((response) => {
        if (response.data.success) {
          setOrders(response.data.orders)
        } else {
          console.log(response.data.message);
        }
      })
  }, []);
  return (
    <Container>
      <h1 className="text-black-50 p-3 text-center rounded">
        Your Orders
      </h1>
      <div className="orders">
        {orders?.map((order) => (
          <Col key={order.id} className="orders-card">
            <OrderCard orderid={order.id} text={"empty for now"} 
            datesent={formatDate(order._date_sent)}
            ordername={order.name}
            />
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
