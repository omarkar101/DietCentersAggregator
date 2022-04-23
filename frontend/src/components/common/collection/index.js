import React from "react";
import "./collection.css";
import NextArrow from "../carousel/nextArrow";
import PrevArrow from "../carousel/prevArrow";
import Slider from "react-slick";
import { Link } from "react-router-dom";
import meal_plan_default from '../../../images/meal-plan-default.jpeg';

const settings = {
  infinite: false,
  slidesToShow: 4,
  slidesToScroll: 1,
  nextArrow: <NextArrow />,
  prevArrow: <PrevArrow />,
};

const Collection = ({ list }) => {
  return (
    <div
      className="collections"
      style={{
        borderBottomStyle: "solid",
        borderBottomWidth: 2,
        borderBottomColor: "#21ad83",
      }}
    >
      <div style={{ maxWidth: "1100px", margin: "0px auto" }}>
        <div className="title">Packages</div>

        <div className="collection-subtitle-row">
          <div className="collection-subtitle-text">
            Explore list of top packages in Beirut, based on trends
          </div>
          <div className="collection-location">
            <div>All Packages in Beirut</div>
            <i className="fi fi-rr-caret-right absolute-center"></i>
          </div>
        </div>

        <Slider {...settings}>
          {list?.map((item) => {
            return <Item key={item.id} item={item} />;
          })}
        </Slider>
      </div>
    </div>
  );
};

const Item = ({ item }) => {
  return (
    <div key={item.id}>
      <Link
        to={`/package/${item.id}/${item.user_id}`}
        style={{ color: "inherit", textDecoration: "inherit" }}
      >
        <div className="collection-cover">
          <img src={item.image || meal_plan_default} className="collection-image" alt={item.name} />
          <div className="gradient-bg"></div>
          <div className="collection-card-title">{item.name}</div>
          <div className="collection-card-subtitle">
            <div>${item.price}</div>
            <i className="fi fi-rr-caret-right absolute-center"></i>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default Collection;
