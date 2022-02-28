import React, { useState, useContext } from "react";
import "../../components/common/header/header.css";
import Footer from "../../components/common/footer";
import TabOptions from "../../components/common/tabOptions";
import Explore from "../../components/explore";
import DiningOut from "../../components/diningOut";
import Nightlife from "../../components/nightlife";
import { UserContext } from "../../context/UserContext";


const HomePage = () => {
  const [activeTab, setActiveTab] = useState("Explore");
  const {value, setValue} = useContext(UserContext);

  return (
    <div>
      <TabOptions activeTab={activeTab} setActiveTab={setActiveTab} />
      {getCorrectScreen(activeTab)}
      <Footer />
      <div>{value}</div>
    </div>
  );
};

const getCorrectScreen = (tab) => {
  switch (tab) {
    case "Explore":
      return <Explore />;
    case "Service Providers Meal Plans":
      return <DiningOut />;
    case "Our Meal Plans":
      return <Nightlife />;
    default:
      return <Explore />;
  }
};

export default HomePage;
