import React from "react";
import styled from "styled-components";
import ImagesSection from "./ImagesSection";
import { useParams } from "react-router-dom";
import PackageModal from "./packageModal";
import PackageCard from "./packageCard";
import { useCallback, useReducer, useEffect } from "react";
import ItemCard from "./itemCard";
import { getMealPlansOfServiceProvider, getItemsOfServiceProvider, getItemsOfAMealPlanOfServiceProvider } from "../../api/requests";

const reducer = (state, action) => {
  switch (action.type) {
    case "get-all-items":
      return { ...state, modalOpen: false, items: action.items };
    case "get-all-meal-plans":
      return { ...state, modalOpen: false, mealPlans: action.mealPlans };
    case "open-package-modal":
      return {
        ...state,
        modalOpen: true,
        selectedPackageItems: action.packageItems,
      };
    case "close-package-modal":
      return { ...state, modalOpen: false };
    default:
      throw new Error();
  }
};

const ServiceProviderPage = (props) => {
  // const { name, description, stars, reviews, images } = props;
  const { id } = useParams();

  const [state, dispatch] = useReducer(reducer, {
    modalOpen: false,
    selectedPackageItems: [],
    items: [],
    mealPlans: [],
  });

  useEffect(() => {
    getMealPlansOfServiceProvider(id)
      .then((response) => {
        if (response.data.success) {
          dispatch({
            type: "get-all-meal-plans",
            mealPlans: response.data.meal_plans,
          });
        } else {
          alert(response.data.message);
        }
      })
      .catch((e) => {
        alert(e);
      });

    getItemsOfServiceProvider(id)
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
  }, [id]);

  const toggleOpenModal = useCallback((meal_plan_id) => {
    if (meal_plan_id == null){
      return;
    } else {
      getItemsOfAMealPlanOfServiceProvider(id, meal_plan_id)
        .then((response) => {
          if (response.data.success) {
            dispatch({ type: "open-package-modal", packageItems: response.data.meal_plan_items });
          } else {
            alert(response.data.message);
          }
        })
        .catch((e) => {
          alert(e);
        });
    }
  },[]);

  const toggleModalOnClose = useCallback(() => {
    dispatch({ type: "close-package-modal" });
  }, []);

  return (
    <PageBase>
      <ImagesSection {...props} />

      <MenuItemsContainer className="mt-5">
        <StyledSection>
          <MenuSectionTitle>Menu Items</MenuSectionTitle>
        </StyledSection>
        {state.items?.map((item) => (
          <ItemCard key={item.id} item={item} />
        ))}

        <StyledSection>
          <MenuSectionTitle>Our Package Deals</MenuSectionTitle>
        </StyledSection>
        <PackageModal
          isOpen={state.modalOpen}
          onClose={toggleModalOnClose}
          packageItems={state.selectedPackageItems}
        />
        {state.mealPlans?.map((plan) => (
          <ItemTextAndButtonWrapper>
            <PackageCard key={plan.id} plan={plan} openModal={toggleOpenModal} />
            <ButtonContainer>
              <AddSpanStyle>ADD</AddSpanStyle>
              <svg xmlns="http://www.w3.org/2000/svg" fill="#114f3cd9" width="16" height="16" viewBox="0 0 20 20" aria-labelledby="icon-svg-title- icon-svg-desc-" role="img">
              <path d="M15.5 9.42h-4.5v-4.5c0-0.56-0.44-1-1-1s-1 0.44-1 1v4.5h-4.5c-0.56 0-1 0.44-1 1s0.44 1 1 1h4.5v4.5c0 0.54 0.44 1 1 1s1-0.46 1-1v-4.5h4.5c0.56 0 1-0.46 1-1s-0.44-1-1-1z"></path>
              </svg>
            </ButtonContainer>
          </ItemTextAndButtonWrapper>
        ))}
      </MenuItemsContainer>
    </PageBase>
  );
};



const AddSpanStyle = styled.span`
  color: #114f3cd9;
  font-size: 1.4rem;
  margin: 0px 0.5rem;
  font-weight: 600;
`;

const ButtonContainer = styled.div`
  display: flex;
  webkit-box-align: center;
  align-items: center;
  webkit-box-pack: center;
  justify-content: center;
  width: 8.2rem;
  height: 3.2rem;
  border: 0.5px solid rgb(232, 232, 232);
  border-radius: 0.8rem;
  overflow: hidden;
  cursor: pointer;
  user-select: none;
  background: rgb(248, 248, 248);
  position: relative;
  border: 1px solid #114f3cd9;
  background: transparent;
`;

const ItemTextAndButtonWrapper = styled.div`
  width: 100%;
  display: flex;
  webkit-box-pack: justify;
  justify-content: space-between;
`;

const StyledSection = styled.section`
  position: relative;
  margin-bottom: 2rem;
  width: 100%;
`;

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
