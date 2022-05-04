import React, { useEffect, useState } from "react";
import styled from "styled-components";
import OrderCard from "./orderCard";
import "./ordersHistory.css";
import { Col } from "react-bootstrap";
import {getClientOrderHistory} from "../../api/requests"

import NextArrow from "../common/carousel/nextArrow";
import PrevArrow from "../common/carousel/prevArrow";
import Slider from "react-slick";

const OrdersHistory = () => {
  const [orders, setOrders] = useState([]);
  const formatDate = (inputdate) => {
    let date = new Date(inputdate);
    console.log(date);
    let formattedDate = ((date.getMonth() > 8) ? (date.getMonth() + 1) : ('0' + (date.getMonth() + 1))) + '/' + ((date.getDate() > 9) ? date.getDate() : ('0' + date.getDate())) + '/' + date.getFullYear()
    return formattedDate;
  }
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
      <h1 className="text-black-50 text-center rounded">
        Your Orders
      </h1>
      <div className="orders">
        <Slider {...settings}>
        {orders?.map((order) => (
          <Col key={order.id} className="orders-card">
            <OrderCard orderid={order.id} text={"empty for now"} 
            datesent={formatDate(order._date_sent)}
            ordername={order.name}
            serviceprovidername = {order.service_provider_name}
            description = {order.description}
            imgURL = {order.imgURL}
            />
          </Col>
        ))}
        </Slider>
      </div>
    </Container>
  );
};

const Container = styled.div`
  position: relative;
  align-self: center;
  box-sizing: inherit;
  font-weight: 300;
  padding: 50px;
`;

const settings = {
  infinite: false,
  slidesToShow: 4,
  slidesToScroll: 1,
  nextArrow: <NextArrow />,
  prevArrow: <PrevArrow />,
  // dots: true,
};

export default OrdersHistory;
