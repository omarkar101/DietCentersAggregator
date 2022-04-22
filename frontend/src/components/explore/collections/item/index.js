import React from "react";
import { Link } from "react-router-dom";
import "./item.css";

const Item = ({ item }) => {
  return (
      <div>
        <div className='delivery-item-cover'>
          <img src={item.cover} className='delivery-item-image' alt={item.name} />
        </div>
        <div className='delivery-item-title'>{item.name}</div>
      </div>
  );
};

export default Item;
