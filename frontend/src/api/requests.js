import { Post, Get } from "./setup";

export const signUpClient = (email, password, firstName, lastName, phoneNumber) => {
  const data = new FormData();
  data.append('first_name', firstName);
  data.append('last_name', lastName);
  data.append('phone_number', phoneNumber);
  data.append('email', email);
  data.append('password', password);
  data.append('user_type', 'client');
  return Post('/auth/signup/user', data);
}

export const getAllItems = () => {
  return Get('/items/public/get/all');
}

export const getAllMealPlans = () => {
  return Get('/meal_plans/public/get/all');
}

export const getAllServiceProviders = () => {
  return Get('/service_providers/public/get/all');
}

export const searchForServiceProvidersByName = (serviceProviderName) => {
  const data = new FormData();
  data.append('service_provider_name', serviceProviderName);
  return Post('/service_providers/public/get/search', data);
}
