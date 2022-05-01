import React, { useCallback, useEffect, useReducer, useState } from "react";
import { Button, Table } from "react-bootstrap";
import styled from "styled-components";
import { getAllServiceProviderSubscribedClients, cancelSubscribedClient, sendMealToClient } from '../../api/requests';
import PreferredMealModal from './preferred_meal_modal';


const reducer = (state, action) => {
    switch (action.type) {
      case 'get-all-meal-plans-for-subscribed-clients':
        return { ...state, mealPlans: action.mealPlans };
      case "cancel-subscribed-client":
        return { ...state, mealPlans: action.mealPlans };
      case "open-client-preferred-meal-modal":
        return {...state, modalOpen: true, selectedClient: action.client, selectedMealPlan: action.mealPlan };
      case "close-client-preferred-meal-modal":
        return {...state, modalOpen: false};
      default:
        throw new Error();
    }
};


const ServiceProviderSubscribedClients = (props) => {
  const [state, dispatch] = useReducer(reducer, {
    mealPlans: [],
    modalOpen: false,
    selectedClient: null,
    selectedMealPlan: null
  });

  const [success, setSuccess] = useState(null);

  const formatDate = (inputdate) => {
    let date = new Date(inputdate);
    let formattedDate = ((date.getMonth() > 8) ? (date.getMonth() + 1) : ('0' + (date.getMonth() + 1))) + '/' + ((date.getDate() > 9) ? date.getDate() : ('0' + date.getDate())) + '/' + date.getFullYear()
    return formattedDate;
  }
  const formatLastOrderedDate = (inputDate) => {
    if( inputDate == null){
      return 'No Orders yet';
    }
    if (isToday(inputDate)){
      return 'Today';
    }
    return formatDate(inputDate);
  }

  const isToday = (someDate) => {
    const today = new Date()
    let date = new Date(someDate);
    return date.getDate() === today.getDate() &&
      date.getMonth() === today.getMonth() &&
      date.getFullYear() === today.getFullYear()
  }
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

  const sendMeal = useCallback((e,f) => {
    if (e != null){
      if (f!=null){
        sendMealToClient(e, f)
          .then((response) => {
            if (response.data.success) {
              setSuccess('Meal successfully sent to client');
              setTimeout(() => { setSuccess(null)}, 5000);
              window.scrollTo({
                top: 0,
                left: 0,
                behavior: "smooth"
              });
            } else {
              console.log(response.data.message);
            }
          })
          .catch((e) => {
            console.log(e);
          });
      }
    }
  }, []);

  const toggleViewClientPreferredMealModal = useCallback((e, f) => {
    const client = e;
    const mealPlan = f
    dispatch({ type: "open-client-preferred-meal-modal", client: client, mealPlan: mealPlan })
  }, []);

  const toggleClosePreferredMealModal = useCallback(() => {
    dispatch({type:"close-client-preferred-meal-modal"})
  }, [] );

  return (
    <>
    {success != null && (
        <div class="alert alert-success" role="alert">
          {success}
        </div>
      )}
      <Container>
        <PreferredMealModal
          isOpen={state.modalOpen}
          onClose={toggleClosePreferredMealModal}
          onSubmit={sendMeal}
          client= {state.selectedClient}
          mealPlan={state.selectedMealPlan}
        />
        {state.mealPlans == null || state.mealPlans.length === 0 ? <h1>You don't have any available meal plans.</h1>
        : state.mealPlans?.map((mealPlan) => (
          <div>
            <h2>{mealPlan.name}</h2>
            <Table striped bordered hover>
              <tr>
                <th>First Name</th>
                <th>Last Name</th>
                <th>Email Address</th>
                <th>Phone Number</th>
                <th>Location</th>
                <th>Most Recent Order Date</th>
                <th>Actions</th>
              </tr>
              {mealPlan.clients?.map((client) => (
                <tr>
                  <td>{client.first_name}</td>
                  <td>{client.last_name}</td>
                  <td>{client.email}</td>
                  <td>{client.phone_number}</td>
                  <td style={{whiteSpace: 'pre-line'}}>{client.location}</td>
                  <td>{formatLastOrderedDate(client.last_ordered_meal_date)}</td>
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
                      <Button
                        variant="primary"
                        size="sm"
                        onClick={() => toggleViewClientPreferredMealModal(client, mealPlan)}
                      >
                        Preferred Meal
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
