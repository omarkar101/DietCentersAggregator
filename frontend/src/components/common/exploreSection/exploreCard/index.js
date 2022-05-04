import React, { useCallback } from "react";
import { Link } from "react-router-dom";
import "./exploreCard.css";
import profile from "../../../../images/blank-profile-picture.png";

const ExploreCard = ({ restaurant }) => {
  const id = restaurant.user_id;
  const name = restaurant.name;
  const coverImg = restaurant?.img_url || profile;
  const phonenumber = restaurant.phone_number;
  const address = restaurant.address;
  const bottomContainers = [];

  return (
    <Link
      to={`/serviceProvider/${id}`}
      style={{ color: "inherit", textDecoration: "inherit" , display: "flex"}}
    >
      <div
        className="explore-card cur-po"
        style={{
          borderStyle: "solid",
          borderWidth: 2,
          borderColor: "#21ad83",
          margin: "auto",
        }}
      >
        <div className="explore-card-cover">
          <img src={coverImg} alt={name} className="explore-card-image" />
        </div>
        <div className="res-row">
          <div className="res-name" style={{fontSize:"1.6rem"}}>{name}</div>
        </div>
        <div className="res-row">
          <div className="res-name">{phonenumber}</div>
        </div>
        <div className="res-row">
          <div className="res-name">{address}</div>
        </div>
      </div>
    </Link>
  );
};

export default ExploreCard;
