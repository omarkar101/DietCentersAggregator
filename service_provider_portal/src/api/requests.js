import { Post } from "./setup";

export const signUpServiceProvider = (email, password, name, phoneNumber) => {
  const data = new FormData();
  data.append('name', name);
  data.append('phone_number', phoneNumber);
  data.append('email', email);
  data.append('password', password);
  data.append('user_type', 'service_provider');
  console.log(data);
  return Post('/auth/signup/user', data);
}

export const addOneItem = (item_name, item_category, item_description) => {
  const data = new FormData();
  data.append('item_name', item_name);
  data.append('category', item_category);
  data.append('item_description', item_description);
  return Post('/items/add/one', data);
}

export const getAllItems = () => {
  return Post('/items/get/all');
}
