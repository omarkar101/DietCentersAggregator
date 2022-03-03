import React from "react";
import ExploreCard from "./exploreCard";
import "./exploreSection.css";

const ExploreSection = ({ list, collectionName }) => {
  return (
    <div className='explore-section'>
      <div className='title'>{collectionName}</div>
      <div className='explore-grid'>
        {list.map((restaurant) => {
          return <ExploreCard restaurant={restaurant} />;
        })}
      </div>
    </div>
  );
};

export default ExploreSection;
