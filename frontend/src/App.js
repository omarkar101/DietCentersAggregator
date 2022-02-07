import React from "react";
import HomePage from "./pages/home";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import SignUp from "./pages/signup";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Checkout from "./components/checkout/checkout";
import OrdersHistory from "./components/ordersHistory/ordersHistory";
import Profile from "./components/profile/profile";
import AppNavbar from "./components/common/header/appNavbar";
import Login from "./pages/login";
import ServiceProviderPage from "./components/serviceProvider/serviceProvider";

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
            <Route path='/login' element={<Login />} />
            <Route path='/serviceProvider/:id' element={<ServiceProviderPage />} />
          </Routes>
        </div>
      </>
    </BrowserRouter>
  );
};

export default App;
