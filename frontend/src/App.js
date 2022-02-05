import React from "react";
import HomePage from "./pages/home";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import SignUp from "./pages/signup";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Checkout from "./components/checkout/checkout";
import OrdersHistory from "./components/ordersHistory/ordersHistory";
import Profile from "./components/profile/profile";
import AppNavbar from "./components/common/header/appNavbar";

const App = () => {
  return (
    <BrowserRouter>
      <>
        <AppNavbar />
        <div>
          <Routes>
            <Route path='/signup' element={<SignUp />} />
            <Route path='/' element={<HomePage />} />
            <Route path='/checkout' element={<Checkout />} />
            <Route path='/ordershistory' element={<OrdersHistory />} />
            <Route path='/profile' element={<Profile />} />
          </Routes>
        </div>
      </>
    </BrowserRouter>
  );
};

export default App;
