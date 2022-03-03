import React from "react";
import "./tabOptions.css";
import { MdOutlineExplore, MdExplore, MdOutlineFoodBank, MdFoodBank, MdMenuBook } from 'react-icons/md';

const tabs = [
  {
    id: 1,
    name: "Explore",
    inactive_img: <MdOutlineExplore size="24"/>,
    backdrop: "FCEEC0",
    active_img: <MdExplore size="24"/>,
  },
  {
    id: 2,
    name: "Service Providers Meal Plans",
    inactive_img: <MdOutlineFoodBank size="24"/>,
    backdrop: "E5F3F3",
    active_img:  <MdFoodBank size="24"/>,
  },
  {
    id: 3,
    name: "Our Meal Plans",
    inactive_img: <MdMenuBook size="24"/>,   
    backdrop: "EDF4FF",
    active_img:  <MdMenuBook size="24"/>,
  },
];

const TabOptions = ({ activeTab, setActiveTab }) => {
  return (
    <div className='tab-options'>
      <div className='max-width options-wrapper'>
        {tabs.map((tab) => {
          return (
            <div onClick={() => setActiveTab(tab.name)} className={`tab-item absolute-center cur-po ${activeTab === tab.name && "active-tab"}`}>
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
