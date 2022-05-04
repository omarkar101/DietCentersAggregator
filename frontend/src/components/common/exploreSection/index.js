import React from "react";
import ExploreCard from "./exploreCard";
import "./exploreSection.css";

import NextArrow from "../../common/carousel/nextArrow";
import PrevArrow from "../../common/carousel/prevArrow";
import Slider from "react-slick";

const ExploreSection = ({ list, collectionName }) => {
  return (
    <div className="explore-section">
      <div className="title">{collectionName}</div>
      <Slider {...settings}>
        {list.map((restaurant) => {
          return (
            <ExploreCard key={restaurant.user_id} restaurant={restaurant} />
          );
        })}
      </Slider>
    </div>
  );
};

const settings = {
  infinite: false,
  slidesToShow: 4,
  slidesToScroll: 1,
  nextArrow: <NextArrow />,
  prevArrow: <PrevArrow />,
  // dots: true,
};

export default ExploreSection;
