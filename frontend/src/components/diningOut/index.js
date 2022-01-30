import React from "react";
import Collection from "../common/collection";
import "./diningOut.css";
import { diningOut } from "../../data/diningOut";
import Filters from "../common/filters";
import ExploreSection from "../common/exploreSection";

const collectionList = [
    {
        id:1,
        title: "Newly Opened",
        cover:"https://b.zmtcdn.com/data/pictures/chains/8/204588/932c4885738c856990b0aab132993ca4_o2_featured_v2.jpg",
        places: "12 places"
    },
    {
        id:2,
        title: "Veggie Friendly",
        cover:"https://b.zmtcdn.com/data/pictures/chains/8/204588/932c4885738c856990b0aab132993ca4_o2_featured_v2.jpg",
        places: "5 places"
    },
    {
        id:3,
        title: "Trending This Week",
        cover:"https://b.zmtcdn.com/data/pictures/chains/8/204588/932c4885738c856990b0aab132993ca4_o2_featured_v2.jpg",
        places: "10 places"
    },
    {
        id:4,
        title: "Best of Beirut",
        cover:"https://b.zmtcdn.com/data/pictures/chains/8/204588/932c4885738c856990b0aab132993ca4_o2_featured_v2.jpg",
        places: "50 places"
    },
    {
        id:5,
        title: "Great Breakfasts",
        cover:"https://b.zmtcdn.com/data/pictures/chains/8/204588/932c4885738c856990b0aab132993ca4_o2_featured_v2.jpg",
        places: "7 places"
    },
    {
        id:6,
        title: "Must Try Brunches",
        cover:"https://b.zmtcdn.com/data/pictures/chains/8/204588/932c4885738c856990b0aab132993ca4_o2_featured_v2.jpg",
        places: "17 places"
    },
]
const diningFilters = [
    {
        id: 1,
        icon: <i className="fi fi-rr-settings-sliders absolute-center"></i>,
        title: "Filter"
    },
    {
        id: 2,
        title: "Rating: 4.0+"
    },
    {
        id: 3,
        title: "Safe and Hygienic"
    },
    {
        id: 4,
        title: "Pure Vegie"
    },
    {
        id: 5,
        title: "Delivery Time",
        icon: <i className="fi fi-rr-apps-sort absolute-center"></i>
    },
    {
        id: 6,
        title: "Great Offers"
    },
]

const diningList = diningOut;

const DiningOut = () => {
    return (
        <div>
            <Collection list={collectionList} />
            <div className="max-width">
                <Filters filterList={diningFilters} />
            </div>
            <ExploreSection list={diningList} collectionName="Dine-out Restaurants in Beirut" />
        </div>
    );
}

export default DiningOut;