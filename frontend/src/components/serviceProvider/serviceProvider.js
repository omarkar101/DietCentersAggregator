import React, { useState } from "react";
import { Button } from "react-bootstrap";
import styled from "styled-components";
import ImagesSection from "./ImagesSection";
import { useParams } from "react-router-dom";
import PackageModal from "./packageModal";
import PackageCard from "./packageCard";
import { useCallback, useReducer, useEffect } from "react";
import ItemCard from "./itemCard";
import {
  getMealPlansOfServiceProvider,
  getItemsOfServiceProvider,
  getItemsOfAMealPlanOfServiceProvider,
  getServiceProviderById,
} from "../../api/requests";
import SubscribeModal from "./subscribeModal";
import {
  subscribeClientToMealPlan,
  getClientMealPlan,
} from "../../api/requests";

const reducer = (state, action) => {
  switch (action.type) {
    case "get-service-provider-by-id":
      return { ...state, serviceProvider: action.serviceProvider };
    case "get-all-items":
      return { ...state, modalOpen: false, items: action.items };
    case "get-all-meal-plans":
      return { ...state, modalOpen: false, mealPlans: action.mealPlans };
    case "success-package-items":
      return {
        ...state,
        selectedPackageItems: action.packageItems,
      };
    case "close-package-modal":
      return { ...state, modalOpen: false };
    case "submit-subscribe-modal":
      return {
        ...state,
        subscribeModalOpen: false,
      };
    case "open-subscribe-modal":
      return {
        ...state,
        subscribeModalOpen: true,
        selectedMealPlan: action.mealPlan
      };
    case "close-subscribe-modal":
      return {
        ...state,
        subscribeModalOpen: false
      };
    default:
      throw new Error();
  }
};

const ServiceProviderPage = () => {
  const { id } = useParams();
  const [showPackages, setShowPackages] = useState(null);
  const [packageSymbol, setPackageSymbol] = useState('+');
  const [itemsSymbol, setItemsSymbol] = useState('+');
  const [showItems, setShowItems] = useState(null);

  const [state, dispatch] = useReducer(reducer, {
    modalOpen: false,
    subscribeModalOpen: false,
    selectedPackageItems: [],
    items: [],
    mealPlans: [],
    serviceProvider: null,
    selectedMealPlan: null
  });

  const [success, setSuccess] = useState(null);
  const [error, setError] = useState(null);

  const toggleOpenSubscribeModal = useCallback((e) => {
    const plan = e
    if (plan.id == null) {
      return;
    } else {
      getItemsOfAMealPlanOfServiceProvider(id, plan.id)
        .then((response) => {
          if (response.data.success) {
            dispatch({
              type: "success-package-items",
              packageItems: response.data.meal_plan_items,
            });
          } else {
            console.log(response.data.message);
          }
        })
        .catch((e) => {
          console.log(e);
        });
    }
    dispatch({
      type: "open-subscribe-modal",
      mealPlan: plan
    });
  }, [id]);

  useEffect(() => {
    getServiceProviderById(id)
      .then((response) => {
        if (response.data.success) {
          dispatch({
            type: "get-service-provider-by-id",
            serviceProvider: response.data.service_provider,
          });
        } else {
          console.log(response.data.message);
        }
      })
      .catch((e) => {
        console.log(e);
      });

    getMealPlansOfServiceProvider(id)
      .then((response) => {
        if (response.data.success) {
          dispatch({
            type: "get-all-meal-plans",
            mealPlans: response.data.meal_plans,
          });
        } else {
          console.log(response.data.message);
        }
      })
      .catch((e) => {
        console.log(e);
      });

    getItemsOfServiceProvider(id)
      .then((response) => {
        if (response.data.success) {
          dispatch({ type: "get-all-items", items: response.data.items });
        } else {
          console.log(response.data.message);
        }
      })
      .catch((e) => {
        console.log(e);
      });
  }, [id]);

  const toggleSubscribeModalOnSubmit = useCallback((e) => {
    getClientMealPlan()
      .then((response) => {
        if (response.data.success) {
          if (response.data.meal_plan_id == null) {
            if (e !=null){
            subscribeClientToMealPlan(e.id, e.meal_plan_uses)
              .then((response) => {
                if (response.data.success) {
                  dispatch({ type: "submit-subscribe-modal" });
                  setSuccess( `You are now subscribed to the meal plan ${e.name}`);
                  window.scrollTo({
                    top: 0,
                    left: 0,
                    behavior: "smooth"
                  });
                  setTimeout(() => { setSuccess(null)}, 3000);
                } else {
                  console.log(response.data.message);
                }
              })
              .catch((e) => {
                console.log(e);
              });
            }
          } else {
            dispatch({ type: "close-subscribe-modal" })
            setError( "You are already subcribed to another meal plan, you can cancel your subscription and then choose a different package.");
            window.scrollTo({
              top: 0,
              left: 0,
              behavior: "smooth"
            });
            setTimeout(() => { setError(null)}, 5000); 
          }
        } else {
          console.log(response.data.message);
        }
      })
      .catch((e) => {
        console.log(e);
      });
  }, []);

  const toggleModalOnClose = useCallback(() => {
    dispatch({ type: "close-package-modal" });
  }, []);

  const toggleSubscribeModalOnClose = useCallback(() => {
    dispatch({ type: "close-subscribe-modal" });
  }, []);

  return (
    <PageBase>
      {success != null && (
        <div class="alert alert-success" role="alert">
          {success}
        </div>)}
      {error != null && (
        <div class="alert alert-danger" role="alert">
          {error}
        </div>)}

      <SubscribeModal
        isOpen={state.subscribeModalOpen}
        onClose={toggleSubscribeModalOnClose}
        onSubmit={toggleSubscribeModalOnSubmit}
        mealPlan={state.selectedMealPlan}
        items={state.selectedPackageItems}
      />
      <PackageModal
        isOpen={state.modalOpen}
        onClose={toggleModalOnClose}
        packageItems={state.selectedPackageItems}
      />
      <div style={{width: '35%', float:'left'}}>
        <ImagesSection service_provider={state.serviceProvider} />
      </div>

      <div style={{width: '60%', float:'right'}}>
        
        <StyledSection>

          <MenuSectionTitle onClick={() => { setShowPackages(!showPackages); setPackageSymbol(packageSymbol=='-'?'+':'-')}}>
            {packageSymbol} Our Package Deals
          </MenuSectionTitle>
        </StyledSection>



        {showPackages ? (

        state.mealPlans?.map((plan) => (
          <>
          {/* // <ItemTextAndButtonWrapper> */}
          <div style={{width: '90%', margin: 'auto', position: 'relative'}}>
            <PackageCard
              key={plan.id}
              plan={plan}
            />
            {/* <img src={plan.image} alt="image" width="300px" height="100%" /> */}
            <Button
              variant="success"
              onClick={() => toggleOpenSubscribeModal(plan)}
              style={{
                backgroundColor: "transparent",
                border: "solid 1px #114f3cd9",
                height: "3.2rem",
                width: "3.2rem",
                position: 'absolute',
                top: '50%',
                right: '2rem',
                transform: 'translateY(-50%)',
              }}
              disabled= {!plan.isavailable}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="#114f3cd9"
                width="20"
                height="20"
                viewBox="0 0 20 20"
                aria-labelledby="icon-svg-title- icon-svg-desc-"
                role="img"
              >
                <path d="M15.5 9.42h-4.5v-4.5c0-0.56-0.44-1-1-1s-1 0.44-1 1v4.5h-4.5c-0.56 0-1 0.44-1 1s0.44 1 1 1h4.5v4.5c0 0.54 0.44 1 1 1s1-0.46 1-1v-4.5h4.5c0.56 0 1-0.46 1-1s-0.44-1-1-1z"></path>
              </svg>
            </Button>
            </div>
            </>
          // {/* </ItemTextAndButtonWrapper> */}
        ))
      ) : 
      (
        <></>
      )}

        <StyledSection>
          <MenuSectionTitle onClick={() => {  setShowItems(!showItems); setItemsSymbol(itemsSymbol=='-'?'+':'-') }}>
            {itemsSymbol} Menu Items
          </MenuSectionTitle>
        </StyledSection>

        <div style={{width: '90%', margin: 'auto', position: 'relative'}}>
        
        {showItems ? (
          state.items?.map((item) => (
            <ItemCard key={item.id} item={item} />
          ))
          ) : 
          (
            <></>
          )}
          </div>
          
      </div>
          
    </PageBase>
  );
};

const StyledSection = styled.section`
  position: relative;
  margin-bottom: 2rem;
  width: 100%;
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
  display: flex;
  align-items: center;
  padding: 1rem;
  color: #114f3cd9;
  cursor: pointer
`;

const PageBase = styled.div`
  position: relative;
  align-self: center;
  max-height: initial;
  margin: 0 auto;
  font-size: 1.6rem;
  box-sizing: inherit;
  font-weight: 300;
  padding: 50px;
`;

export default ServiceProviderPage;
