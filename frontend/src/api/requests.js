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

export const updateClientProfile = (firstName, LastName, PhoneNumber, Weight, Height, Age,
                                    addressEmail, addressName, addressPhoneNumber, city, country,
                                    street, building, floor, receiverFirstName, receiverLastName, instructions) => {
  const data = new FormData();
  data.append('first_name', firstName);
  data.append('last_name', LastName);
  data.append('phone_number', PhoneNumber);
  data.append('weight', Weight);
  data.append('height', Height);
  data.append('age', Age);
  data.append('address_email', addressEmail);
  data.append('address_name', addressName);
  data.append('address_phone_number', addressPhoneNumber);
  data.append('country', country);
  data.append('city', city);
  data.append('street', street);
  data.append('building', building);
  data.append('floor', floor);
  data.append('address_first_name', receiverFirstName);
  data.append('address_last_name', receiverLastName);
  data.append('instructions', instructions);
  return Post('/user/public/update/personal_info', data);
}
