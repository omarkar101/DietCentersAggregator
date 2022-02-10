import React from "react";
import Collection from "../common/collection";
import "./diningOut.css";
import { diningOut } from "../../data/diningOut";

const collectionList = [
  {
    id: 1,
    title: "Service Provider",
    cover: "https://b.zmtcdn.com/data/pictures/chains/8/204588/932c4885738c856990b0aab132993ca4_o2_featured_v2.jpg",
    places: "Super Package ($100)",
  },
  {
    id: 1,
    title: "Service Provider",
    cover: "https://b.zmtcdn.com/data/pictures/chains/8/204588/932c4885738c856990b0aab132993ca4_o2_featured_v2.jpg",
    places: "Super Package ($100)",
  },
  {
    id: 1,
    title: "Service Provider",
    cover: "https://b.zmtcdn.com/data/pictures/chains/8/204588/932c4885738c856990b0aab132993ca4_o2_featured_v2.jpg",
    places: "Super Package ($100)",
  },
  {
    id: 1,
    title: "Service Provider",
    cover: "https://b.zmtcdn.com/data/pictures/chains/8/204588/932c4885738c856990b0aab132993ca4_o2_featured_v2.jpg",
    places: "Super Package ($100)",
  },
  {
    id: 1,
    title: "Service Provider",
    cover: "https://b.zmtcdn.com/data/pictures/chains/8/204588/932c4885738c856990b0aab132993ca4_o2_featured_v2.jpg",
    places: "Super Package ($100)",
  },
  {
    id: 1,
    title: "Service Provider",
    cover: "https://b.zmtcdn.com/data/pictures/chains/8/204588/932c4885738c856990b0aab132993ca4_o2_featured_v2.jpg",
    places: "Super Package ($100)",
  },
];

const diningFilters = [
  {
    id: 1,
    icon: <i className='fi fi-rr-settings-sliders absolute-center'></i>,
    title: "Filter",
  },
  {
    id: 2,
    title: "Rating: 4.0+",
  },
  {
    id: 3,
    title: "Safe and Hygienic",
  },
  {
    id: 4,
    title: "Pure Vegie",
  },
  {
    id: 5,
    title: "Delivery Time",
    icon: <i className='fi fi-rr-apps-sort absolute-center'></i>,
  },
  {
    id: 6,
    title: "Great Offers",
  },
];

const diningList = diningOut;

const DiningOut = () => {
  return (
    <div>
      <Collection list={collectionList} />
      {/* <div style={{ "max-width": "1100px", margin: "0px auto" }}>
        <Filters filterList={diningFilters} />
      </div>
      <ExploreSection list={diningList} collectionName='Dine-out Restaurants in Beirut' /> */}
    </div>
  );
};

export default DiningOut;
