import React from "react";
import { Link } from "react-router-dom";
import "./item.css";
import meals_default from '../../../../images/meals_default.svg';

const Item = ({ item }) => {
  return (
      <div>
        <div className='delivery-item-cover'>
          <img src={item.image_url || meals_default} className='delivery-item-image' alt={item.name} />
        </div>
        <div className='delivery-item-title'>{item.name}</div>
      </div>
  );
};

export default Item;
