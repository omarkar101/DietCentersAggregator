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
import Package from "./components/mealPackages/package";
import Authentication from "./containers/auth_container";
import API from "./api/api";
import Search from "./components/search/search";
import ForgetPasswordModal from "./pages/login/forget_passwod_modal";

const App = () => {
  API.interceptors.response.use((response) => {
    if (response.data.response_status == 401) {
      window.location.pathname = "/login";
    }
    return response;
  });
  return (
    <Authentication.Provider>
      <BrowserRouter>
        <>
          <AppNavbar />
          <div>
            <Routes>
              <Route path="/signup" element={<SignUp />} />
              <Route path="/" element={<HomePage />} />
              <Route path="/checkout" element={<Checkout />} />
              <Route path="/ordershistory" element={<OrdersHistory />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/login" element={<Login />} />
              <Route path='/forget_password' element={<ForgetPasswordModal />} />
              <Route path="/package/:id/:service_provider_id" element={<Package />} />
              <Route path="/search" element={<Search />} />
              <Route
                path="/serviceProvider/:id"
                element={
                  <ServiceProviderPage />
                }
              />
            </Routes>
          </div>
        </>
      </BrowserRouter>
    </Authentication.Provider>
  );
};

export default App;
