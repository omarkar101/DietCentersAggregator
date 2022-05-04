import React from "react";
import "./tabOptions.css";
import { MdOutlineExplore, MdExplore, MdOutlineFoodBank, MdFoodBank, MdMenuBook } from 'react-icons/md';

const tabs = [
  {
    id: 1,
    name: "Explore",
    inactive_img: <MdOutlineExplore size="48"/>,
    backdrop: "FCEEC0",
    active_img: <MdExplore size="48"/>,
  },
  {
    id: 2,
    name: "Our Meal Plans",
    inactive_img: <MdMenuBook size="48"/>,   
    backdrop: "EDF4FF",
    active_img:  <MdMenuBook size="48"/>,
  },
];

const TabOptions = ({ activeTab, setActiveTab }) => {
  return (
    <div className='tab-options'>
      <div className='max-width options-wrapper'>
        {tabs.map((tab) => {
          return (
            <div key={tab.id} onClick={() => setActiveTab(tab.name)} className={`tab-item absolute-center cur-po ${activeTab === tab.name && "active-tab"}`}>
              <div className='tab-image-container absolute-center' style={{ backgroundColor: `${activeTab === tab.name ? tab.backdrop : ""}`}}>
                {activeTab === tab.name ? tab.active_img : tab.inactive_img}
              </div>
              <div className='tab-name'>{tab.name}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default TabOptions;
