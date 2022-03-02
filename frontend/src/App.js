import React, { useMemo, useState } from "react";
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
import Authentication from "./containers/user_authentication";

const App = () => {
  return (
    <Authentication.Provider>
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
            <Route path='/package/:id' element={<Package />} />
            <Route path='/serviceProvider/:id' element={<ServiceProviderPage name="Mr. Brown" description="American, Italian, Salad, Burger, Sandwich, Pizza" stars="4.2" reviews="1123" images={['https://images.immediate.co.uk/production/volatile/sites/30/2020/08/chorizo-mozarella-gnocchi-bake-cropped-9ab73a3.jpg?quality=90&resize=556,505','https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxleHBsb3JlLWZlZWR8Mnx8fGVufDB8fHx8&w=1000&q=80','https://www.acouplecooks.com/wp-content/uploads/2020/01/Sheet-Pan-Dinner-019.jpg', 'https://www.dinneratthezoo.com/wp-content/uploads/2017/12/meal-prep-burrito-bowls.jpg', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSoYnNqiQs_UfkEiQrBrcb5ZLZ4Zgsoz-D6PQ&usqp=CAU', 'https://www.freshnlean.com/wp-content/uploads/2021/03/Meal-Plan-plate-protein.png']}/>} />
          </Routes>
        </div>
      </>
    </BrowserRouter>
    </Authentication.Provider>
  );
};

export default App;
