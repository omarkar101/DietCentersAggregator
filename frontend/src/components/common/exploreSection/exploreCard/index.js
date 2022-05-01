import React, { useCallback } from "react";
import { Link } from "react-router-dom";
import "./exploreCard.css";
import profile from '../../../../images/blank-profile-picture.png';

const ExploreCard = ({restaurant}) => {
    const id = restaurant.user_id;
    const name = restaurant.name;
    const coverImg = restaurant?.img_url || profile;
    const deliveryTime = "31min";
    const rating = "4.2";
    const approxPrice = "39 USD";
    const cuisines = [restaurant.address];
    const bottomContainers = [];
    const goldOff = "NEW";
    const proOff = null;
    const discount = null;

    return (
        <Link to={`/serviceProvider/${id}`} style={{ color: 'inherit', textDecoration: 'inherit'}}>
        <div className="explore-card cur-po">
                <div className="explore-card-cover">
                    <img src={coverImg} alt={name} className="explore-card-image" />
                    <div className="delivery-time">{deliveryTime}</div>
                    {proOff && <div className="pro-off">{proOff}</div>}
                    {goldOff && <div className="gold-off absolute-center">{goldOff}</div>}
                    {discount && <div className="discount absolute-center">{discount}</div>}
                </div>
                <div className="res-row">
                    <div className="res-name">{name}</div>
                    {rating && (
                        <div className="res-rating absolute-center">
                            {rating} <i className="fi fi-rr-star absolute-center"></i>
                        </div>
                        )}
                </div>
                <div className="res-row">
                        {cuisines.length && (
                            <div className="res-cuisine">
                                {cuisines.map((item, i) => {
                                    return (
                                        <span key={cuisines} className="res-cuisine-tag">
                                            {item}
                                            {i !== cuisines.length - 1 && ","}
                                        </span>
                                    );
                                })}
                            </div>
                        )}
                        {approxPrice && <div className="res-price">{approxPrice}</div>}
                </div>
                {bottomContainers.length > 0 && (
                    <div>
                        <div className="card-separator"> </div>
                        <div className="explore-bottom">
                            <img
                            src={bottomContainers[0]?.image?.url}
                            style={{ height: "18px" }}
                            alt={bottomContainers[0]?.text}
                            />
                            <div className="res-bottom-text">{bottomContainers[0]?.text}</div>
                        </div>
                    </div>
                )}
        </div>
        </Link>

    );
}

export default ExploreCard;
