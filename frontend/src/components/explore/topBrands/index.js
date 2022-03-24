import React from "react";
import Slider from "react-slick";
import NextArrow from "../../common/carousel/nextArrow";
import PrevArrow from "../../common/carousel/prevArrow";
import { Link } from "react-router-dom";
import "./topBrands.css";

const topBrandsList = [
  {
    id: 1,
    time: "35 min",
    cover:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/3/36/McDonald%27s_Golden_Arches.svg/1200px-McDonald%27s_Golden_Arches.svg.png",
  },
  {
    id: 2,
    time: "29 min",
    cover:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/3/36/McDonald%27s_Golden_Arches.svg/1200px-McDonald%27s_Golden_Arches.svg.png",
  },
  {
    id: 3,
    time: "32 min",
    cover:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/3/36/McDonald%27s_Golden_Arches.svg/1200px-McDonald%27s_Golden_Arches.svg.png",
  },
  {
    id: 4,
    time: "30 min",
    cover:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/3/36/McDonald%27s_Golden_Arches.svg/1200px-McDonald%27s_Golden_Arches.svg.png",
  },
  {
    id: 5,
    time: "25 min",
    cover:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/3/36/McDonald%27s_Golden_Arches.svg/1200px-McDonald%27s_Golden_Arches.svg.png",
  },
];

const settings = {
  infinite: false,
  slidesToShow: 4,
  slidesToScroll: 1,
  nextArrow: <NextArrow />,
  prevArrow: <PrevArrow />,
};

const TopBrands = () => {
  return (
    <div className='top-brands'>
      <div style={{ maxWidth: "1100px", margin: "0px auto" }}>
      <div className='collection-title'>Top Service Providers for you</div>
      <Slider {...settings}>
        {topBrandsList.map((brand) => {
          return (
            <div key={brand.id}>
              <Link to={`/serviceProvider/${1}`} style={{ color: 'inherit', textDecoration: 'inherit'}}>
                <div className='top-brands-cover'>
                  <img src={brand.cover} className='top-brands-image' alt={brand.time} />
                </div>
              </Link>
            </div>
          );
        })}
      </Slider>
      </div>
    </div>
  );
};

export default TopBrands;
