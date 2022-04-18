import React from "react";
import { Col, Row } from "react-bootstrap";
import { useCallback, useReducer, useEffect } from "react";
import ItemCard from "../serviceProvider/itemCard";
import styled from "styled-components";
import { useParams } from "react-router-dom";
import { getItemsOfAMealPlanOfServiceProvider, getMealPlanById } from "../../api/requests";


const item = {
  name: "Kaju Matar Masala",
  price: "AED24",
  description: "Cashews, green peas and tomato masala gravy.",
  imagelink:
    "https://b.zmtcdn.com/data/dish_photos/14d/fc2cd40b2b5a93852f4e1fde9612c14d.jpg?output-format=webp&fit=around|130:130&crop=130:130;*,*",
};

const reducer = (state, action) => {
  switch (action.type) {
    case 'get-meal-plan-by-id':
      return { ...state, mealPlan: action.mealPlan };
    case 'get-items-of-meal-plan':
      return { ...state, itemsOfMealPlan: action.itemsOfMealPlan}
    default:
      throw new Error();
  }
};

const Package = () => {
  const { id, service_provider_id } = useParams();

  const [state, dispatch] = useReducer(reducer, {
    mealPlan: null,
    itemsOfMealPlan: []
  });

  useEffect(() => {
    getMealPlanById(id)
      .then((response) => {
        if (response.data.success) {
          dispatch({ type: 'get-meal-plan-by-id', mealPlan: response.data.meal_plan });
        } else {
          console.log(response.data.message);
        }
      })
      .catch((e) => {
        console.log(e);
      });

      getItemsOfAMealPlanOfServiceProvider(service_provider_id, id)
      .then((response) => {
        if (response.data.success) {
          dispatch({ type: "get-items-of-meal-plan", itemsOfMealPlan: response.data.meal_plan_items });
        } else {
          console.log(response.data.message);
        }
      })
      .catch((e) => {
        console.log(e);
      });
  }, [id, service_provider_id]);

  return (
    <Container>
      <h1 className="text-black-50 p-3 text-center rounded">Package Summary</h1>
      <Row className="mt-5">
        <Col
          lg={6}
          md={6}
          sm={12}
          style={{
            borderStyle: "solid",
            borderWidth: 2,
            borderColor: "#21ad83",
          }}
          className="rounded p-5 m-auto shadow-sm rounded-lg"
        >
          <InnerContainer>
            <BigImageContainer>
              <br />
              <Title>
                <div>{state.mealPlan?.name}</div>
              </Title>

              <TotalSection>
                <AddAReviewButton>
                  <Text>Total: {state.mealPlan?.price}</Text>
                </AddAReviewButton>
              </TotalSection>
            </BigImageContainer>
            <SmallImagesSection>
              <SmallImageContainer>
                <SmallImage
                  src={state.mealPlan?.image} // "https://images.immediate.co.uk/production/volatile/sites/30/2020/08/chorizo-mozarella-gnocchi-bake-cropped-9ab73a3.jpg?quality=90&resize=556,505"
                  alt='No image'
                />
              </SmallImageContainer>
            </SmallImagesSection>
          </InnerContainer>
        </Col>
      </Row>
      <Row className="mt-5">
        <Col
          lg={6}
          md={6}
          sm={12}
          className="rounded p-5 m-auto rounded-lg d-flex justify-content-center h-100"
        >
          <div className="d-flex flex-column">
            <h4 style={{ marginLeft: 10 }}>Items included in the package:</h4>
            {state.itemsOfMealPlan?.map((item) => (
              <Col key={item.id} className="orders-card">
                <ItemCard item={item} />
              </Col>
            ))}
          </div>
        </Col>
      </Row>
    </Container>
  );
};

const AddAReviewButton = styled.div`
  margin-top: 1.5rem;
  padding-bottom: 1rem;
  min-width: auto;
  min-height: 36px;
  display: inline-flex;
  border-radius: 0.6rem;
  border: none;
  cursor: pointer;
  vertical-align: middle;
  -webkit-box-align: center;
  align-items: center;
  -webkit-box-pack: center;
  justify-content: center;
  height: 100%;
  width: 100%;
  line-height: 36px;
  margin-top: 0px;
  margin-left: 0px;
  white-space: nowrap;
  font-size: 1.4rem;
  font-weight: 300;
  color: black;
  opacity: 1;
  background: border-box #bce6d988;
  padding: 0px 2rem;
  transition: transform 0.25s ease 0s, opacity 0.25s ease 0s,
    box-shadow 0.25s ease 0s;
  outline: none !important;
`;

const InnerContainer = styled.div`
  width: 100%;
  display: flex;
  position: relative;
`;
const SmallImagesSection = styled.section`
  width: 100%;
  height: 100%;
  margin-left: 0.6rem;
  display: flex;
  flex-direction: column;
`;
const BigImageContainer = styled.div`
  min-width: 62.4%;
  max-width: 100%;
  width: 62.4%;
  height: 100%;
  cursor: pointer;
  margin: 0px;
  overflow: hidden;
`;
const SmallImageContainer = styled.div`
  min-width: 62.4%;
  max-width: 100%;
  width: 100%;
  height: 100%;
  position: relative;
  cursor: pointer;
  overflow: hidden;
  margin: 0px 0px 0.3rem;
`;

const SmallImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  transform: none;
  opacity: 1;
  will-change: transform, opacity;
  border-radius: inherit;
  filter: brightness(0.95);
  transition: transform 0.4s cubic-bezier(0.73, -0.53, 0.58, 1) 0s,
    opacity 1.63s ease 0s, filter 0.4s ease 0s;
`;

const Text = styled.span`
  display: inline-block;
  vertical-align: middle;
  line-height: normal;
  font-size: inherit;
  transition: transform 0.4s ease 0s;
`;

const TotalSection = styled.section`
  display: flex;
  -webkit-box-align: center;
  align-items: center;
  margin-top: 1.5rem;
  padding-bottom: 1rem;
  pointer-events: all;
  opacity: 1;
  transition: opacity 0.2s ease-in-out 0s;
  position: absolute;
  bottom: 0;
`;


const Title = styled.section`
  font-size: 1.8rem;
  line-height: 1.5;
  color: rgb(130, 130, 130);
  margin-top: 0.5rem;
`;

const Container = styled.div`
  position: relative;
  align-self: center;
  max-height: initial;
  box-sizing: inherit;
  font-weight: 300;
  margin: 100px;
`;
export default Package;
