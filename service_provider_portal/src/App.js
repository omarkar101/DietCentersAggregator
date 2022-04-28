import React, { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import AppNavbar from "./components/common/navbar";
import Items from "./components/items/items";
import Login from "./components/login/login";
import MealPlans from "./components/meal_plans/mealPlans";
import Profile from "./components/profile/profile";
import SignUp from "./components/signup/signup";
import Authentication from "./containers/auth_container";
import User from "./containers/user_container";
import API from "./api/api";
import ServiceProviderSubscribedClients from "./components/service_provider_subscribed_clients/service_provider_subscribed_clients";
import { getServiceProviderProfile } from "./api/requests";

const App = () => {
  API.interceptors.response.use((response) => {
    if (response.data.response_status === 401 && window.location.pathname !== "/login") {
      window.location.pathname = "/login";
    }
    return response;
  });
  const [user, setUser] = useState(null);
  useEffect(() => {
    if (user == null) {
      getServiceProviderProfile()
        .then((response) => {
          if (response.data.success) {
            setUser(response.data.service_provider_personal_info);
          }
        })
        .catch((e) => {
          console.log(e);
        });
    }
  }, [user]);
  return (
    <>
      <Authentication.Provider>
        <User.Provider>
          <BrowserRouter>
            <AppNavbar user={user} />
            <Routes>
              <Route path="/" element={<MealPlans />} />
              <Route path='/signup' element={<SignUp />} />
              <Route path='/login' element={<Login setUser={setUser} />} />
              <Route path='/items' element={<Items />} />
              <Route path='/meal_plans' element={<MealPlans />} />
              <Route path='/profile' element={<Profile />} />
              <Route path='/subscribed_clients' element={<ServiceProviderSubscribedClients />} />
            </Routes>
          </BrowserRouter>
        </User.Provider>
      </Authentication.Provider>
    </>
  );
};

export default App;
