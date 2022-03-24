import { Post } from "./setup";

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
  return Get('/items/get/all');
}

export const getAllMealPlans = () => {
  return Get('/meal_plans/get/all')
}
