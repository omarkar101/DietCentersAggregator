import React from "react";
import styled from "styled-components";
import ImagesSection from "./ImagesSection";
import { useParams } from "react-router-dom";
import PackageModal from "./packageModal";
import PackageCard from "./packageCard";
import { useCallback, useReducer, useState, useEffect } from "react";
import ItemCard from "./itemCard";
import { getAllMealPlans, getAllItems } from "../../api/requests";

const reducer = (state, action) => {
  switch (action.type) {
    case "get-all-items":
      return { ...state, modalOpen: false, items: action.items };
    case "get-all-meal-plans":
      return { ...state, modalOpen: false, mealPlans: action.mealPlans };
    case 'open-package-modal':
      return { ... state, modalOpen: true, selectedPackageItems: action.packageItems };
    case 'close-package-modal':
      return { ...state, modalOpen: false };
    default:
      throw new Error();
  }
}


const ServiceProviderPage = (props) => {
  // const { name, description, stars, reviews, images } = props;

  useEffect(() => {
    getAllMealPlans()
    .then((response) => {
      if (response.data.success) {
        dispatch({ type: 'get-all-meal-plans', mealPlans: response.data.meal_plans})
      } else {
        alert(response.data.message);
      }
    })
    .catch((e) => {
      alert(e);
    });

    getAllItems()
    .then((response) => {
      if (response.data.success) {
        dispatch({ type: "get-all-items", items: response.data.items });
      } else {
        alert(response.data.message);
      }
    })
    .catch((e) => {
      alert(e);
    });

  }, []);

  const packagesinfo = [
    {
      name: "Package 1",
      price: "100 $",
      description: "Cashews, green peas and tomato masala gravy."
    },
    {
      name: "Package 2",
      price: "150 $",
      description: "Cashews, green peas and tomato masala gravy."
    },
    {
      name: "Package 3",
      price: "100 $",
      description: "Cashews, green peas and tomato masala gravy."
    },
    {
      name: "Package 4",
      price: "200 $",
      description: "Cashews, green peas and tomato masala gravy."
    },
  ];

  const itemsinfo = [
    {
      name: "Kaju Matar Masala",
      price: "AED24",
      description: "Cashews, green peas and tomato masala gravy.",
      imagelink:
        "https://b.zmtcdn.com/data/dish_photos/14d/fc2cd40b2b5a93852f4e1fde9612c14d.jpg?output-format=webp&fit=around|130:130&crop=130:130;*,*",
    },
    {
      name: "Kaju Matar Masala",
      price: "AED24",
      description: "Cashews, green peas and tomato masala gravy.",
      imagelink:
        "https://b.zmtcdn.com/data/dish_photos/14d/fc2cd40b2b5a93852f4e1fde9612c14d.jpg?output-format=webp&fit=around|130:130&crop=130:130;*,*",
    },
  ];

  const [state, dispatch] = useReducer(reducer, {
    modalOpen: false,
    selectedPackageItems: [],
    items: [],
    mealPlans: []
  });

  const items = [
    {'name': 'Burger', 'description': 'Hello World', 'categories': 'Fast Food'},
    {'name': 'Burger', 'description': 'Hello World', 'categories': 'Fast Food'},
    {'name': 'Burger', 'description': 'Hello World', 'categories': 'Fast Food'}
  ]

  const toggleOpenModal = useCallback((e) => {
    dispatch({type: 'open-package-modal', packageItems: items});
  }, []);

  const toggleModalOnClose = useCallback(() => {
    dispatch({type: 'close-package-modal'});
  }, []);
  

  const { id } = useParams();

  console.log(id);

  return (
    <PageBase>
      <ImagesSection {...props} />

      

      {/* <OrderOnlineInnerWrapper>
        <OrderOnlineHeader>Order Online</OrderOnlineHeader> */}
        <hr style={{ alignSelf: "flex-start", width: "100%", marginBottom: "3rem" }} />
      {/* </OrderOnlineInnerWrapper> */}

      <MenuItemsContainer>

        <StyledSection>
          <MenuSectionTitle>Menu Items</MenuSectionTitle>
        </StyledSection>
        {state.items?.map((item) => (
          <ItemCard item={item} />
        ))}

        <StyledSection>
          <MenuSectionTitle>Our Package Deals</MenuSectionTitle>
        </StyledSection>
        <PackageModal isOpen={state.modalOpen} onClose={toggleModalOnClose} packageItems={state.selectedPackageItems} />
        {state.mealPlans?.map((plan) => (
          <PackageCard plan={plan} openModal={toggleOpenModal} />
        ))}

      </MenuItemsContainer>
      
    </PageBase>
  );
};

const StyledSection = styled.section`
  position: relative;
  margin-bottom: 2rem;
  width: 100%;
`

const MenuItemsContainer = styled.section`
  width: 100%;
  padding-left: 1rem;
  min-width: 50%;
  padding-right: 1rem;
`;

const MenuSectionTitle = styled.h4`
  font-size: 2.4rem;
  line-height: 1.2;
  margin: 0px;
  margin-block-end: 0px;
  position: sticky;
  top: 149px;
  padding: 1.4rem 0px;
  font-weight: 500;
  z-index: 1;
  display: flex;
  -webkit-box-pack: justify;
  justify-content: space-between;
  -webkit-box-align: center;
  align-items: center;
  padding: 1rem;
  color: #114f3cd9;
  border-left: 3px solid #114f3cd9;
  background: linear-gradient(to left, #d9fff326, #84e9cb);
`;

const PageBase = styled.div`
  position: relative;
  max-width: 110rem;
  align-self: center;
  max-height: initial;
  margin: 0 auto;
  font-size: 1.6rem;
  box-sizing: inherit;
  font-weight: 300;
  padding: 50px;
`;

export default ServiceProviderPage;
