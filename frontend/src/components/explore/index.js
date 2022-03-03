import React from "react";
import ExploreSection from "../common/exploreSection";
import ExploreCollections from "./collections";
import TopBrands from "./topBrands";
import { restaurants } from "../../data/restaurants";

const restaurantList = restaurants;

const Explore = () => {
  return (
    <>
      <ExploreCollections />
      {/* <TopBrands /> */}
      <ExploreSection list={restaurantList} collectionName='Explore Service Providers in your area' />
    </>
  );
};

export default Explore;
