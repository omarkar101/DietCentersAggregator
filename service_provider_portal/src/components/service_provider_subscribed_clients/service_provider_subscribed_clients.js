import React, { useCallback, useEffect, useReducer, useState } from "react";
import { Button, Table } from "react-bootstrap";
import styled from "styled-components";
import { getAllServiceProviderSubscribedClients, cancelSubscribedClient, getAllMealPlans } from '../../api/requests';


const reducer = (state, action) => {
    switch (action.type) {
      case 'get-all-meal-plans-for-subscribed-clients':
        return { ...state, mealPlans: action.mealPlans };
      case "cancel-subscribed-client":
        return { ...state, mealPlans: action.mealPlans };
      default:
        throw new Error();
    }
};


const ServiceProviderSubscribedClients = (props) => {
  const [state, dispatch] = useReducer(reducer, {
    mealPlans: []
  });

  useEffect(() => {
    getAllServiceProviderSubscribedClients()
    .then((response) => {
      if (response.data.success) {
        dispatch({ type: 'get-all-meal-plans-for-subscribed-clients', mealPlans: response.data.meal_plans})
      } else {
        console.log(response.data.message);
      }
    })
    .catch((e) => {
      console.log(e);
    });
  }, []);

  const toggleCancelSubscribedClient = useCallback((e) => {
    const clientId = e.target.id;
    cancelSubscribedClient(clientId)
      .then((response) => {
        if (response.data.success) {
          dispatch({ type: "cancel-subscribed-client", mealPlans: response.data.meal_plans })
        } else {
          console.log(response.data.message);
        }
      })
      .catch((e) => {
        console.log(e);
      });
  }, []);

  return (
    <>
      <Container>
        {state.mealPlans?.map((mealPlan) => (
          <div>
            <h2>{mealPlan.name}</h2>
            <Table striped bordered hover>
              <tr>
                <th>First Name</th>
                <th>Last Name</th>
                <th>Email Address</th>
                <th>Phone Number</th>
                <th>Location</th>
                <th>Date Ordered</th>
                <th>Actions</th>
              </tr>
              {mealPlan.clients?.map((client) => (
                <tr>
                  <td>{client.first_name}</td>
                  <td>{client.last_name}</td>
                  <td>{client.email}</td>
                  <td>{client.phone_number}</td>
                  <td style={{whiteSpace: 'pre-line'}}>{client.location}</td>
                  <td>{client.date_ordered}</td>
                  <td>
                    <div className="mb-4">
                      <Button
                        id={client.user_id}
                        variant="danger"
                        size="sm"
                        onClick={toggleCancelSubscribedClient}
                      >
                        Cancel
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </Table>
            <hr style={{ opacity: 1 }}></hr>
          </div>
        ))}
      </Container>
    </>
  );
};

const Container = styled.div`
  margin: 10px 10px 10px 10px;
  th,
  tr {
    text-align: center;
  }
`;

export default ServiceProviderSubscribedClients;
