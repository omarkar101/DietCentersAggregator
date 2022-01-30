import React from "react";
import NextArrow from "../../common/carousel/nextArrow";
import PrevArrow from "../../common/carousel/prevArrow";
import "./deliveryCollections.css";
import DeliveryItem from "./deliveryItem";
import Slider from "react-slick";

const deliveryItems=[
    {
        id:1,
        title: "Pizza",
        cover:
            "https://b.zmtcdn.com/data/pictures/chains/8/204588/932c4885738c856990b0aab132993ca4_o2_featured_v2.jpg",
    },
    {
        id:2,
        title: "Burger",
        cover:
            "https://b.zmtcdn.com/data/pictures/chains/8/204588/932c4885738c856990b0aab132993ca4_o2_featured_v2.jpg",
    },
    {
        id:3,
        title: "Rolls",
        cover:
            "https://b.zmtcdn.com/data/pictures/chains/8/204588/932c4885738c856990b0aab132993ca4_o2_featured_v2.jpg",
    },
    {
        id:4,
        title: "Cake",
        cover:
            "https://b.zmtcdn.com/data/pictures/chains/8/204588/932c4885738c856990b0aab132993ca4_o2_featured_v2.jpg",
    },
    {
        id:5,
        title: "Tawouk",
        cover:
            "https://b.zmtcdn.com/data/pictures/chains/8/204588/932c4885738c856990b0aab132993ca4_o2_featured_v2.jpg",
    },
    {
        id:6,
        title: "Dick",
        cover:
            "https://b.zmtcdn.com/data/pictures/chains/8/204588/932c4885738c856990b0aab132993ca4_o2_featured_v2.jpg",
    },
    {
        id:7,
        title: "Chicken",
        cover:
            "https://b.zmtcdn.com/data/pictures/chains/8/204588/932c4885738c856990b0aab132993ca4_o2_featured_v2.jpg",
    },
    {
        id:8,
        title: "Sexy cock",
        cover:
            "https://b.zmtcdn.com/data/pictures/chains/8/204588/932c4885738c856990b0aab132993ca4_o2_featured_v2.jpg",
    },
    {
        id:9,
        title: "Juicy V",
        cover:
            "https://b.zmtcdn.com/data/pictures/chains/8/204588/932c4885738c856990b0aab132993ca4_o2_featured_v2.jpg",
    },
    {
        id:10,
        title: "Omar's dick",
        cover:
            "https://b.zmtcdn.com/data/pictures/chains/8/204588/932c4885738c856990b0aab132993ca4_o2_featured_v2.jpg",
    },
];

const settings = {
    infinite: false,
    slidesToShow: 4,
    slidesToScroll: 1,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />
}
const DeliveryCollections = () => {
    return (
        <div className="delivery-collections">
            <div className="max-width">
                <div className="collection-title">Eat what makes you happy</div>
                <Slider {...settings}>
                    {deliveryItems.map((item) => {
                        return <DeliveryItem item={item}/> ;
                    })}
                </Slider>
            </div>
        </div>
    );
};

export default DeliveryCollections;