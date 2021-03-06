import React from "react";
import { useCallback, useReducer, useState, useEffect } from "react";
import ExploreSection from "../common/exploreSection";
import ExploreCollections from "./collections";
import TopBrands from "./topBrands";
import { restaurants } from "../../data/restaurants";
import { getAllServiceProviders } from "../../api/requests";

const restaurantList = restaurants;

const reducer = (state, action) => {
  switch (action.type) {
    case "get-all-service-providers":
      return { ...state, serviceProviders: action.serviceProviders };
    default:
      throw new Error();
  }
};

const Explore = () => {
  const [error, setError] = useState(null);

  const [state, dispatch] = useReducer(reducer, {
    serviceProviders: [],
  });

  useEffect(() => {
    getAllServiceProviders()
      .then((response) => {
        if (response.data.success) {
          setError(null);
          dispatch({
            type: "get-all-service-providers",
            serviceProviders: response.data.service_providers,
          });
        } else {
          console.log(response.data.message);
          setError(response.data.message);
        }
      })
      .catch((e) => {
        console.log(e);
        setError(e);
      });
  }, []);

  return (
    <>
      {error != null && (
        <div class="alert alert-danger" role="alert">
          {error}
        </div>
      )}
      <ExploreCollections />
      {/* <TopBrands /> */}
      <ExploreSection
        list={state.serviceProviders ? state.serviceProviders : []}
        collectionName="Explore Service Providers in your area"
      />
    </>
  );
};

export default Explore;
