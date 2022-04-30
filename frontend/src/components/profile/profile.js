import React, { useEffect, useReducer, useState, useCallback } from "react";
import { Form, Button, Col, Row, Card, InputGroup } from "react-bootstrap";
import { Link } from "react-router-dom";
import styled from "styled-components";
import ItemCard from "../serviceProvider/itemCard";
import { getClientProfile, getMealPlanById, getClientMealPlan, getItemsOfAMealPlan, setClientPreferredMeal, getClientPreferredMealPlan, getItemById } from "../../api/requests";

const reducer = (state, action) => {
  switch (action.type) {
    case "set-subscribed-meal-plan-id":
      return { ...state, subscribedMealPlanId: action.mealPlanId }
    case "set-subscribed-meal-plan":
      return { ...state, subscribedMealPlan: action.mealPlan }
    case "set-items":
      return { ...state, items: action.items }
    case "success-preferred-meal":
      return{...state, preferredMealPlan: action.preferred_meal}
    default:
      throw new Error();
  }
};

const Profile = () => {

  const [state, dispatch] = useReducer(reducer, {
    subscribedMealPlanId: null,
    subscribedMealPlan: null,
    preferredMealPlan: null,
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
    getClientMealPlan()
    .then((response) => {
      if(response.data.success) {
        setSubscribedMealPlanId(response.data.meal_plan_id);
        if (subscribedMealPlanId==null){
          return;
        }
        else {

          getMealPlanById(subscribedMealPlanId)
          .then((response) => {
            if(response.data.success) {
              setSubscribedMealPlan(response.data.meal_plan);
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
  }, []); 

  useEffect(() => {
    if (subscribedMealPlanId==null){
      return;
    }
    else{
      getItemsOfAMealPlan(subscribedMealPlanId)
      .then((response) => {
        if(response.data.success) {
          setItems(response.data.meal_plan_items);
        }
      })
      .catch((e) => {
        console.log(e);
      });
    }
  }, []);

  useEffect(() => {
    getClientProfile()
      .then((response) => {
        if(response.data.success) {
          const clientPersonalInfo = response.data.client_personal_info;
          // console.log('response.data.client_personal_info:', clientPersonalInfo);
          setFirstName(clientPersonalInfo.first_name);
          setLastName(clientPersonalInfo.last_name);
          setPhoneNumber(clientPersonalInfo.phone_number);
          setaddressEmail(clientPersonalInfo.email);
          setWeight(clientPersonalInfo.biometrics != null ? clientPersonalInfo.biometrics.weight : '');
          setAge(clientPersonalInfo.biometrics != null ? clientPersonalInfo.biometrics.age : '');
          setHeight(clientPersonalInfo.biometrics != null ? clientPersonalInfo.biometrics.height : '');
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

  const choosePreferredMeal= useCallback((e) => {
    var mealId = e.target.id
    setClientPreferredMeal(mealId);
  })

  return (
    <Container>
      <Row style={{borderStyle: "solid", borderWidth: 2, borderColor: "#21ad83"}} className="rounded p-5 m-auto shadow-sm rounded-lg mt-5">
        <h3 className="text-black-50 p-3 text-center mb-5">
          Personal Information
        </h3>
        <Col lg={6} md={6} sm={12} className="m-auto" >
          <h4 className="text-black-50 p-3 text-center">User Details</h4>
          <UserInfo>
            Name: {firstName} {LastName}<br/>
            Phone Number: {PhoneNumber}<br/>
            Email: {addressEmail}
          </UserInfo>
        </Col>
        <Col lg={6} md={6} sm={12} style={{borderLeftStyle: "solid", borderLeftWidth: 2, borderLeftColor: "#21ad83"}}  className="p-5 m-auto">
          <h4 className="text-black-50 p-3 text-center">Address Information and Delivery Preferences</h4>
          {addressName!=null 
          ?
            <UserInfo>
              Address: {addressName}<br/>
              Address Phone Number: {addressPhoneNumber}<br/>
              Country: {country}<br/>
              City: {city}<br/>
              Street: {street}<br/>
              Building: {building}<br/>
              Floor: {floor}<br/>
              Receiver Name: {receiverFirstName + " " + receiverLastName}<br/>
              Delivery Instructions: {instructions}
            </UserInfo>
          : 
            <NoAddress>You did not input your address yet. Click on 'Edit Personal Information' to input your information.</NoAddress>} 
          <br/>
        </Col>
        <Button as={Link} to='/edit_profile' className="mt-5" style={{margin: "auto", color: "white", backgroundColor: "#21ad83", borderColor: "#21ad83", width: "300px"}} type="submit">
          Edit Personal Information
        </Button>
      </Row>
      <h3 className="text-black-50 p-3 text-center mt-5">
        Meal Plan Details
      </h3>

      {(state.subscribedMealPlan==null)
      ?
        <h4 className="text-black-50 p-3 text-center">
          You are not subscribed to any meal plan yet :( <br/>
          Please go to the home page to explore the different meal plans that we offer!
        </h4>
      :
      <>
        <div>
          <Card className="text-center mb-5 w-50 m-auto">
            <Card.Body>
              <Card.Title>You are subscribed to:</Card.Title>
              <Card.Text>
                {state.subscribedMealPlan.name}
              </Card.Text>
            </Card.Body>
            <Card.Footer
              className="text-muted"
              style={{ backgroundColor: "#bce6d988" }}>
              <Card.Text>Price: {state.subscribedMealPlan.price}</Card.Text>
            </Card.Footer>
          </Card>
        </div>
        {state.preferredMealPlan==null
        ?
          <h5 className="text-black-50 p-3 text-center">
            You do not have a set preference yet, you can do so by choosing one of the meals below. <br/>
          </h5>
        :
          <div>
          Your meal preference is:<br/>
          <Col key={state.preferredMealPlan.id} className="w-100">
            <ItemCard item={state.preferredMealPlan} />
          </Col>
          You can modify this by selecting one of the options below.
            {state.items?.map((item) => (
              <ItemTextAndButtonWrapper>
                <Col key={item.id} className="w-100">
                  <ItemCard item={item} />
                </Col>
                  <Button style={{margin: "auto", color: "white", backgroundColor: "#21ad83", borderColor: "#21ad83"}} id={item.id} onClick={choosePreferredMeal}>choose</Button>
              </ItemTextAndButtonWrapper>
              ))}
            </div>
            }   
          </>
        }
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

const UserInfo = styled.div`
  font-size: 20px;
`

const ItemTextAndButtonWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  padding: 20px 10px 20px 10px;
`;

const NoAddress = styled.div`
  color: grey;
`

export default Profile;
