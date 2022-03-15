import { Post } from "./setup";

export const signUpServiceProvider = (email, password, name, phoneNumber) => {
  const data = new FormData();
  data.append('name', name);
  data.append('phone_number', phoneNumber);
  data.append('email', email);
  data.append('password', password);
  data.append('user_type', 'service_provider');
  return Post('/auth/signup/user', data);
}

export const loginServiceProvider = (email, password) => {
  const data = new FormData();
  data.append('email', email);
  data.append('password', password);
  return Post('/auth/login/user', data);
}

export const addOneItem = (item_name, item_description, item_category) => {
  const data = new FormData();
  data.append('item_name', item_name);
  data.append('category', item_category);
  data.append('item_description', item_description);
  return Post('/items/add/one', data);
}

export const deleteOneItem = (itemId) => {
  const data = new FormData();
  data.append('item_id', itemId);
  return Post('/items/delete/one', data);
}

export const editOneItem = (itemId, item_name, item_description, item_category) => {
  const data = new FormData();
  data.append('item_id', itemId);
  data.append('item_name', item_name);
  data.append('item_description', item_description);
  data.append('item_category', item_category);
  return Post('/items/edit/one', data);
}

export const getAllItems = () => {
  return Post('/items/get/all');
}
