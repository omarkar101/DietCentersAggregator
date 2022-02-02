import React from "react";
import "./tabOptions.css";

const tabs=[
    {
        id: 1,
        name: "Delivery",
        inactive_img: "https://www.flaticon.com/svg/vstatic/svg/5074/5074275.svg?token=exp=1643479758~hmac=c94a1d3f86edaf7e5b2634177cde6c25",
        backdrop: "FCEEC0",
        active_img: "https://www.flaticon.com/svg/vstatic/svg/5074/5074701.svg?token=exp=1643479758~hmac=c95a1f4fcc4d80e1787fcdc6dd5cb38a",
    },
    {
        id: 2,
        name: "Dining Out",
        inactive_img: "https://www.flaticon.com/svg/vstatic/svg/5074/5074275.svg?token=exp=1643479758~hmac=c94a1d3f86edaf7e5b2634177cde6c25",
        backdrop: "E5F3F3",
        active_img: "https://b.zmtcdn.com/data/o2_assets/c0bb85d3a6347b2eco70a8db694588261616149578.png",
    },
    {
        id: 3,
        name: "Nightlife",
        inactive_img: "https://www.flaticon.com/svg/vstatic/svg/5074/5074275.svg?token=exp=1643479758~hmac=c94a1d3f86edaf7e5b2634177cde6c25",
        backdrop: "EDF4FF",
        active_img: "https://b.zmtcdn.com/data/o2_assets/c0bb85d3a6347b2eco70a8db694588261616149578.png",
    },
]

const TabOptions = ({ activeTab, setActiveTab }) => {
    return (<div className="tab-options">
        <div className="max-width options-wrapper">
            {tabs.map((tab) => {
                return ( <div onClick={() => setActiveTab(tab.name)}
                    className={`tab-item absolute-center cur-po ${
                        activeTab === tab.name && "active-tab"
                    }`}
                    >
                        <div className="tab-image-container absolute-center"
                        style={{
                            backgroundColor: `${
                                activeTab === tab.name ? tab.backdrop: ""
                            }`,
                        }}
                        >
                            <img className="tab-image" alt="" src={ activeTab === tab.name ? tab.active_img:tab.inactive_img} />
                        </div>
                        <div className="tab-name">{tab.name}</div>
                    </div> 
                )
            })}
        </div>
    </div>
    );
};

export default TabOptions;