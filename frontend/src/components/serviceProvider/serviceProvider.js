import React from "react";
import styled from "styled-components";
import ImagesSection from "./ImagesSection";
import { useParams } from "react-router-dom";
import PackageModal from "./packageModal";
import PackageCard from "./packageCard";
import { useCallback, useReducer, useEffect } from "react";
import ItemCard from "./itemCard";
import { getAllMealPlans, getAllItems } from "../../api/requests";

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

  const [state, dispatch] = useReducer(reducer, {
    modalOpen: false,
    selectedPackageItems: [],
    items: [],
    mealPlans: [],
  });

  useEffect(() => {
    getAllMealPlans()
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

  const toggleOpenModal = useCallback(
    (e) => {
      dispatch({ type: "open-package-modal", packageItems: state.items });
    },
    [state.items]
  );

  const toggleModalOnClose = useCallback(() => {
    dispatch({ type: "close-package-modal" });
  }, []);

  const { id } = useParams();

  console.log(id);

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
          <PackageCard key={plan.id} plan={plan} openModal={toggleOpenModal} />
        ))}
      </MenuItemsContainer>
    </PageBase>
  );
};

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
