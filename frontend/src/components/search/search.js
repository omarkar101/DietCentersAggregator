import React from "react";
import { useLocation } from "react-router-dom";
import { useCallback, useReducer, useState, useEffect } from "react";
import { searchForServiceProvidersByName } from "../../api/requests";
import ExploreSection from "../common/exploreSection";

const reducer = (state, action) => {
  switch (action.type) {
    case "search-service-providers-by-name":
      return { ...state, serviceProviders: action.serviceProviders };
    default:
      throw new Error();
  }
};

const Search = () => {
  const location = useLocation();
  const [state, dispatch] = useReducer(reducer, {
    serviceProviders: [],
  });

  useEffect(() => {
    if (location.state.serviceProviderName == null) {
      return;
    }
    searchForServiceProvidersByName(location.state.serviceProviderName)
      .then((response) => {
        if (response.data.success) {
          console.log(response.data.service_providers);
          dispatch({
            type: "search-service-providers-by-name",
            serviceProviders: response.data.service_providers,
          });
        } else {
          alert(response.data.message);
        }
      })
      .catch((e) => {
        alert(e);
      });
  }, [location.state.serviceProviderName]);

  return (
    <>
      <ExploreSection
        list={state.serviceProviders == null ? [] : state.serviceProviders}
        collectionName={`${state.serviceProviders?.length} result(s) found`}
      />
    </>
  );
};

export default Search;
