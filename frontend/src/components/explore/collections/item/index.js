import React from "react";
import { Link } from "react-router-dom";
import "./item.css";

const Item = ({ item }) => {
  return (
    <Link to={`/serviceProvider/${1}`} style={{ color: 'inherit', textDecoration: 'inherit'}}>
      <div>
        <div className='delivery-item-cover'>
          <img src={item.cover} className='delivery-item-image' alt={item.title} />
        </div>
        <div className='delivery-item-title'>{item.title}</div>
      </div>
    </Link>
  );
};

export default Item;
