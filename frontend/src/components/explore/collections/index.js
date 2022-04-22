import React from "react";
import { useCallback, useReducer, useState, useEffect } from "react";

import NextArrow from "../../common/carousel/nextArrow";
import PrevArrow from "../../common/carousel/prevArrow";
import "./collections.css";
import Item from "./item";
import Slider from "react-slick";

import { getAllItems } from '../../../api/requests';


const reducer = (state, action) => {
  switch (action.type) {
    case "get-all-items":
      return { ...state, items: action.items };
    default:
      throw new Error();
  }
}

const deliveryItems = [
  {
    id: 1,
    title: "Pizza",
    cover: "https://b.zmtcdn.com/data/pictures/2/18897122/68843afe348db683b441860d77afb663.jpg",
  },
  {
    id: 2,
    title: "Burger",
    cover: "https://b.zmtcdn.com/data/pictures/chains/8/18713688/930bca6e6c9bb3d08bcdb9fb6fbcd346.jpg?fit=around|750:500&crop=750:500;*,*",
  },
  {
    id: 3,
    title: "Rolls",
    cover: "https://b.zmtcdn.com/data/pictures/chains/8/204588/932c4885738c856990b0aab132993ca4_o2_featured_v2.jpg",
  },
  {
    id: 4,
    title: "Cake",
    cover: "https://b.zmtcdn.com/data/pictures/chains/8/18713688/930bca6e6c9bb3d08bcdb9fb6fbcd346.jpg?fit=around|750:500&crop=750:500;*,*",
  },
  {
    id: 5,
    title: "Tawouk",
    cover: "https://b.zmtcdn.com/data/pictures/chains/8/204588/932c4885738c856990b0aab132993ca4_o2_featured_v2.jpg",
  },
  {
    id: 6,
    title: "Zyede toom",
    cover: "https://b.zmtcdn.com/data/pictures/2/18897122/68843afe348db683b441860d77afb663.jpg",
  },
  {
    id: 7,
    title: "Chicken",
    cover: "https://b.zmtcdn.com/data/pictures/2/18897122/68843afe348db683b441860d77afb663.jpg",
  },
  {
    id: 8,
    title: "Akel",
    cover: "https://b.zmtcdn.com/data/pictures/chains/8/204588/932c4885738c856990b0aab132993ca4_o2_featured_v2.jpg",
  },
  {
    id: 9,
    title: "Akel",
    cover: "https://b.zmtcdn.com/data/pictures/chains/8/18713688/930bca6e6c9bb3d08bcdb9fb6fbcd346.jpg?fit=around|750:500&crop=750:500;*,*",
  },
  {
    id: 10,
    title: "Akel",
    cover: "https://b.zmtcdn.com/data/pictures/chains/8/204588/932c4885738c856990b0aab132993ca4_o2_featured_v2.jpg",
  },
];

const settings = {
  infinite: true,
  slidesToShow: 4,
  slidesToScroll: 1,
  nextArrow: <NextArrow />,
  prevArrow: <PrevArrow />,
  // dots: true,
};
const ExploreCollections = () => {

  const [state, dispatch] = useReducer(reducer, {
    items: []
  });

  useEffect(() => {
    getAllItems()
    .then((response) => {
      if (response.data.success) {
        dispatch({ type: 'get-all-items', items: response.data.items })
      } else {
        console.log(response.data.message)
      }
    })
    .catch((e) => {
      console.log(e)
    })
  }, []);

  return (
    <div className='collections' 
    style={{ borderBottomStyle: "solid", borderBottomWidth: 2, borderBottomColor: "#21ad83"}}
    >
      <div style={{ maxWidth: "1100px", margin: "0px auto" }}>
        <div className='title'>Eat right!</div>
        <Slider {...settings}>
          {state.items?.map((item) => {
            return <Item key={item.id} item={item} />;
          })}
        </Slider>
      </div>
    </div>
  );
};

export default ExploreCollections;
