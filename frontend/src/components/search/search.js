import React from "react";
import { useLocation } from "react-router-dom";
import { useCallback, useReducer, useState, useEffect } from "react";
import { searchForServiceProvidersByName } from "../../api/requests";
import ExploreSection from "../common/exploreSection";

const reducer = (state, action) => {
    switch (action.type) {
      case "search-service-providers-by-name":
        return { ...state, serviceProviders: action.serviceProviders, collectionName: `${state.serviceProviders?.length} result(s) found` };
      default:
        throw new Error();
    }
  }

  
const Search = () => {

    const location = useLocation();
    const [state, dispatch] = useReducer(reducer, {
        serviceProviders: [],
        collectionName: ''
    });
    
    useEffect(() => {
        searchForServiceProvidersByName(location.state.serviceProviderName)
        .then((response) => {
            if (response.data.success) {
                dispatch({ type: 'search-service-providers-by-name', serviceProviders: response.data.service_providers })
            } else {
            alert(response.data.message);
            }
        })
        .catch((e) => {
            alert(e);
        })
      }, [location.state.serviceProviderName]);

    return (
        <>
          <ExploreSection list={state.serviceProviders == null ? [] : state.serviceProviders } collectionName={state.collectionName} />
        </>
    );
}

export default Search;
