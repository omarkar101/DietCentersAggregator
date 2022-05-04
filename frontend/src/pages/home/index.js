import React, { useState } from "react";
import "../../components/common/header/header.css";
import Footer from "../../components/common/footer";
import TabOptions from "../../components/common/tabOptions";
import Explore from "../../components/explore";
import DiningOut from "../../components/diningOut";
import Nightlife from "../../components/nightlife";

const HomePage = () => {
  const [activeTab, setActiveTab] = useState("Explore");

  return (
    <div>
      <TabOptions activeTab={activeTab} setActiveTab={setActiveTab} />
      {getCorrectScreen(activeTab)}
      <Footer />
    </div>
  );
};

const getCorrectScreen = (tab) => {
  switch (tab) {
    case "Explore":
      return <Explore />;
    case "Our Meal Plans":
      return <Nightlife />;
    default:
      return <Explore />;
  }
};

export default HomePage;
