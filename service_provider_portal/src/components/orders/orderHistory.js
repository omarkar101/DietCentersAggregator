import React, { useEffect, useState } from "react";
import { Table } from "react-bootstrap";
import { getClientOrderHistory } from "../../api/requests";

const OrderHistory = () => {
  const [orders, setOrders] = useState(null);

  useEffect(() => {
    if (orders == null) {
      getClientOrderHistory()
        .then((response) => {
          if (response.data.success) {
            setOrders(response.data.orders)
          } else {
            console.log(response.data.message);
          }
        })
    }
  }, [])
  
  return (
    <div className="container">
      <Table striped bordered hover>
        <tr>
          <th>Client Name</th>
          <th>Client Location</th>
          <th>Item Name</th>
          <th>Date Sent</th>
        </tr>
        {orders != null &&
          orders?.map((order) => (
          <tr>
            <td>{order.client_name}</td>
            <td>{order.client_location}</td>
            <td>{order.name}</td>
            <td>{order._date_sent}</td>
          </tr>
        ))}
      </Table>
  </div>
  )
}

export default OrderHistory;
