import React, { useEffect, useReducer, useState, useCallback } from "react";
import { Form, Button, Col, Row } from "react-bootstrap";
import styled from "styled-components";
import { getClientProfile, getMealPlanById, updateClientProfile, getClientMealPlan, getItemsOfAMealPlan, setClientPreferredMeal } from "../../api/requests";

const reducer = (state, action) => {
  switch (action.type) {
    case "get-list-of-meal-plans":
      return { ...state, mealPlans: action.mealPlans };
    case "set-subscribed-meal-plan-id":
      return { ...state, subscribedMealPlanId: action.mealPlanId }
    case "set-subscribed-meal-plan":
      return { ...state, subscribedMealPlan: action.mealPlan }
    case "set-items":
      return { ...state, items: action.items }
    default:
      throw new Error();
  }
};

const Profile = () => {

  const [state, dispatch] = useReducer(reducer, {
    subscribedMealPlanId: null,
    subscribedMealPlan: null,
    items: []
  });

  const [firstName, setFirstName] = useState('');
  const [LastName, setLastName] = useState('');
  const [PhoneNumber, setPhoneNumber] = useState('');
  const [Weight, setWeight] = useState('');
  const [Height, setHeight] = useState('');
  const [Age, setAge] = useState('');
  const [addressEmail, setaddressEmail] = useState('');
  const [addressName, setaddressName] = useState('');
  const [addressPhoneNumber, setaddressPhoneNumber] = useState('');
  const [city, setcity] = useState('');
  const [country, setcountry] = useState('');
  const [street, setstreet] = useState('');
  const [building, setbuilding] = useState('');
  const [floor, setfloor] = useState('');
  const [receiverFirstName, setreceiverFirstName] = useState('');
  const [receiverLastName, setreceiverLastName] = useState('');
  const [instructions, setinstructions] = useState('');

  useEffect(() => {
    getClientProfile()
      .then((response) => {
        if(response.data.success) {
          const clientPersonalInfo = response.data.client_personal_info;
          // console.log('response.data.client_personal_info:', clientPersonalInfo);
          setFirstName(clientPersonalInfo.first_name);
          setLastName(clientPersonalInfo.last_name);
          setPhoneNumber(clientPersonalInfo.phone_number);
          setWeight(clientPersonalInfo.biometrics != null ? clientPersonalInfo.biometrics.weight : '');
          setAge(clientPersonalInfo.biometrics != null ? clientPersonalInfo.biometrics.age : '');
          setHeight(clientPersonalInfo.biometrics != null ? clientPersonalInfo.biometrics.height : '');
          setaddressEmail(clientPersonalInfo.address != null ? clientPersonalInfo.address.email : '');
          setaddressName(clientPersonalInfo.address != null ? clientPersonalInfo.address.address_name : '');
          setaddressPhoneNumber(clientPersonalInfo.address != null ? clientPersonalInfo.address.phone_number : '');
          setcity(clientPersonalInfo.address != null ? clientPersonalInfo.address.city : '');
          setcountry(clientPersonalInfo.address != null ? clientPersonalInfo.address.country : '');
          setstreet(clientPersonalInfo.address != null ? clientPersonalInfo.address.street : '');
          setbuilding(clientPersonalInfo.address != null ? clientPersonalInfo.address.building : '');
          setfloor(clientPersonalInfo.address != null ? clientPersonalInfo.address.floor : '');
          setreceiverFirstName(clientPersonalInfo.address != null ? clientPersonalInfo.address.first_name : '');
          setreceiverLastName(clientPersonalInfo.address != null ? clientPersonalInfo.address.last_name : '');
          setinstructions(clientPersonalInfo.address != null ? clientPersonalInfo.address.instructions : '');
        }
      })
      .catch((e) => {
        console.log(e);
      });
    }, []);

  useEffect(() => {
    getClientMealPlan()
      .then((response) => {
        if(response.data.success) {
          dispatch({ type: "set-subscribed-meal-plan-id", mealPlanId: response.data.meal_plan_id });
          getMealPlanById(response.data.meal_plan_id) 
            .then((response) => {
              if(response.data.success) {
                dispatch({ type: "set-subscribed-meal-plan", mealPlan: response.data.meal_plan });
                if (response.data.meal_plan.id==null){
                  return;
                }
                else{
                  getItemsOfAMealPlan(response.data.meal_plan.id)
                  .then((response) => {
                    if(response.data.success) {
                      dispatch({ type: "set-items", items: response.data.meal_plan_items });
                    }
                  })
                  .catch((e) => {
                    console.log(e);
                  });
                }
              }
            })
            .catch((e) => {
              console.log(e);
            });
        }
      })
      .catch((e) => {
        console.log(e);
      });
  }, []);

  const choosePreferredMeal= useCallback((e) => {
    var mealId = e.target.id
    setClientPreferredMeal(mealId);
  })

  const handleSubmit = (e) => {
    e.preventDefault();
    updateClientProfile(firstName, LastName, PhoneNumber,
                        Weight, Height, Age, addressEmail,
                        addressName, addressPhoneNumber, city,
                        country, street, building, floor, 
                        receiverFirstName, receiverLastName, instructions)
      .then((response) => {
        if(response.data.success) {
        }
      })
      .catch((e) => {
        console.log(e);
      });
  };
  return (
    <Container>
      <h1 className="text-black-50 p-3 text-center rounded">My Account</h1>

      You are subscribed to the meal plan:
      {(state.subscribedMealPlan==null)?
        <div>no plan lol</div>
      : <p>{state.subscribedMealPlan.name}</p>}

      <hr/>

      <p>choose your preferred meal from this plan:</p>
      {state.items?.map((item) => (
          <div>
            <div>item name: {item.name}</div>
            <div>description: {item.description}</div>
            <button class="btn btn-success" id={item.id} onClick={choosePreferredMeal}>choose</button>
            <hr/>
          </div>
          
        ))}
      
      <Form onSubmit={handleSubmit}>
        <Row className="mt-5">
          <Col
            lg={6}
            md={6}
            sm={12}
            style={{
              borderRightStyle: "solid",
              borderRightWidth: 2,
              borderRightColor: "#21ad83",
            }}
            className="m-auto"
          >
            <div className="p-5 mb-5">
              <h4 className="text-black-50 p-3 text-center">
                User Information
              </h4>
              <Row className="mb-5">
                <Form.Group controlId="formGridPhoneNumber">
                  <Form.Label>Phone Number</Form.Label>
                  <Form.Control value={PhoneNumber} required onChange={(e) => setPhoneNumber(e.target.value)} type="text" placeholder="+961 03/030303" />
                </Form.Group>
              </Row>

              <Row>
                <Form.Group as={Col} md="6" controlId="formGridfirst">
                  <Form.Label>First Name</Form.Label>
                  <Form.Control value={firstName} required onChange={(e) => setFirstName(e.target.value)} type="text" placeholder="First Name" />
                </Form.Group>
                <Form.Group as={Col} md="6" controlId="formGridlast">
                  <Form.Label>Last Name</Form.Label>
                  <Form.Control value={LastName} required onChange={(e) => setLastName(e.target.value)} type="text" placeholder="Last Name" />
                </Form.Group>
              </Row>
            </div>
            <div
              className="p-5"
              style={{
                borderTopStyle: "solid",
                borderTopWidth: 2,
                borderTopColor: "#21ad83",
              }}
            >
              <h4 className="text-black-50 p-3 mb-5 text-center">About Me</h4>

              <Row className="mb-5">
                <Form.Group as={Col} md="4" controlId="formGridWeight">
                  <Form.Label>Weight</Form.Label>
                  <Form.Control value={Weight} required onChange={(e) => setWeight(e.target.value)} placeholder="Weight in Kg" />
                </Form.Group>

                <Form.Group as={Col} md="4" controlId="formGridWeight">
                  <Form.Label>Height</Form.Label>
                  <Form.Control value={Height} required onChange={(e) => setHeight(e.target.value)} placeholder="Height in cm" />
                </Form.Group>
                <Form.Group as={Col} md="4" controlId="formGridWeight">
                  <Form.Label>Age</Form.Label>
                  <Form.Control value={Age} required onChange={(e) => setAge(e.target.value)} placeholder="Age" />
                </Form.Group>
              </Row>
            </div>
          </Col>
          <Col lg={6} md={6} sm={12} className="rounded p-5 m-auto">
            <h4 className="text-black-50 p-3 text-center">
              Contact Information
            </h4>

            <Row className="mb-5">
              <Form.Group className="mb-1" controlId="formGridEmailAddress">
                <Form.Label>Email address</Form.Label>
                <Form.Control value={addressEmail} required onChange={(e) => setaddressEmail(e.target.value)} type="email" placeholder="xyz@example.com" />
              </Form.Group>
              <Form.Group className="mb-1" controlId="formGridAddressName">
                <Form.Label>Address Name</Form.Label>
                <Form.Control
                  required
                  value={addressName}
                  type="text"
                  placeholder="Home,Work,University..."
                  onChange={(e) => setaddressName(e.target.value)}
                />
              </Form.Group>
              <Form.Group
                className="mb-1"
                controlId="formGridAddressPhoneNumber"
              >
                <Form.Label>Address Phone Number</Form.Label>
                <Form.Control value={addressPhoneNumber} required onChange={(e) => setaddressPhoneNumber(e.target.value)} type="tel" placeholder="+961 03/030303" />
              </Form.Group>
            </Row>
            <Row className="mb-3">
              <Form.Group as={Col} md="6" controlId="formGridCity">
                <Form.Label>City</Form.Label>
                <Form.Control value={city} required onChange={(e) => setcity(e.target.value)} placeholder="Beirut" />
              </Form.Group>
              <Form.Group as={Col} md="6" controlId="formGridCountry">
                <Form.Label>Country</Form.Label>
                <Form.Control value={country} required onChange={(e) => setcountry(e.target.value)} placeholder="Lebanon" />
              </Form.Group>
            </Row>
            <Row className="mb-3">
              <Form.Group as={Col} controlId="formGridStreet">
                <Form.Label>Street</Form.Label>
                <Form.Control value={street} required onChange={(e) => setstreet(e.target.value)} placeholder="Makdissi Street" />
              </Form.Group>
            </Row>
            <Row className="mb-3">
              <Form.Group as={Col} md="6" controlId="formGridBuilding">
                <Form.Label>Building</Form.Label>
                <Form.Control value={building} required onChange={(e) => setbuilding(e.target.value)} placeholder="Mirage building" />
              </Form.Group>
              <Form.Group as={Col} md="6" controlId="formGridFloor">
                <Form.Label>Floor</Form.Label>
                <Form.Control value={floor} required onChange={(e) =>setfloor(e.target.value)} placeholder="3rd floor" />
              </Form.Group>
            </Row>
            <Row className="mb-3">
              <Form.Group as={Col} md="6" controlId="formGridAddressFirstName">
                <Form.Label>Receiver First Name</Form.Label>
                <Form.Control value={receiverFirstName} required onChange={(e) => setreceiverFirstName(e.target.value)} placeholder="John" />
              </Form.Group>

              <Form.Group as={Col} md="6" controlId="formGridAddressLastName">
                <Form.Label>Receiver Last Name</Form.Label>
                <Form.Control value={receiverLastName} required onChange={(e) => setreceiverLastName(e.target.value)} placeholder="Doe" />
              </Form.Group>
            </Row>
            <Row className="mb-3">
              <Form.Group as={Col} controlId="formGridAddressInstructions">
                <Form.Label>Instructions</Form.Label>
                <Form.Control value={instructions} required onChange={(e) => setinstructions(e.target.value)} placeholder="Don't ring the bell, knock..." />
              </Form.Group>
            </Row>
          </Col>
          <Button
            className="mt-5"
            style={{
              margin: "auto",
              color: "white",
              backgroundColor: "#21ad83",
              borderColor: "#21ad83",
              width: "300px",
            }}
            type="submit"
          >
            Save Changes
          </Button>

          
        </Row>
      </Form>

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

export default Profile;
