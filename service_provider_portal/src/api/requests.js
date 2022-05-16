import { Post, Get } from "./setup";

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

export const forgetPassword = (email) => {
  const data = new FormData();
  data.append('email', email);
  return Post('/auth/login/forget_password', data);
}
export const updatePassword = (email, password, pin) => {
  const data = new FormData();
  data.append('email', email);
  data.append('password', password);
  data.append('pin', pin);
  return Post('/auth/login/update_password', data);
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

export const editOneItem = (itemId, item_name, item_description, item_category, image) => {
  const data = new FormData();
  data.append('item_id', itemId);
  data.append('item_name', item_name);
  data.append('item_description', item_description);
  data.append('item_category', item_category);
  data.append('item_image', image);
  return Post('/items/edit/one', data);
}

export const getClientPreferredMeal = (clientId) => {
  const data = new FormData()
  data.append('user_id', clientId)
  return Post('/items/get/client_preferred_meal', data)
}

export const getAllItems = () => {
  return Get('/items/get/all');
}

export const addOneMealPlan = (mealPlanName, mealPlanDescription, mealPlanPrice, mealPlanCounter) => {
  const data = new FormData();
  data.append('meal_plan_name', mealPlanName);
  data.append('meal_plan_description', mealPlanDescription);
  data.append('meal_plan_price', mealPlanPrice);
  data.append('meal_plan_uses', mealPlanCounter)
  return Post('/meal_plans/add/one', data)
}

export const deleteOneMealPlan = (mealPlanId) => {
  const data = new FormData();
  data.append('meal_plan_id', mealPlanId);
  return Post('/meal_plans/delete/one', data)
}

export const editOneMealPlan = (mealPlanId, mealPlanName, mealPlanDescription, mealPlanPrice, mealPlanImage, mealPlanCounter) => {
  const data = new FormData();
  data.append('meal_plan_id', mealPlanId);
  data.append('meal_plan_name', mealPlanName);
  data.append('meal_plan_description', mealPlanDescription);
  data.append('meal_plan_price', mealPlanPrice)
  data.append('meal_plan_image', mealPlanImage);
  data.append('meal_plan_uses',mealPlanCounter)
  return Post('/meal_plans/edit/one', data)
}

export const getAllMealPlans = () => {
  return Get('/meal_plans/get/all')
}

export const getMealPlanItems = (meal_plan_id) => {
  const data = new FormData();
  data.append('meal_plan_id', meal_plan_id);
  return Post('/meal_plans/get/items', data);
}

export const removeItemFromMealPlan = (mealPlanId, itemId) => {
  const data = new FormData();
  data.append('meal_plan_id', mealPlanId);
  data.append('item_id', itemId);
  return Post('/meal_plans/delete/item', data);
}

export const getItemsNotInMealPlan = (mealPlanId) => {
  const data = new FormData();
  console.log('CALLED');
  data.append('meal_plan_id', mealPlanId);
  return Post('/meal_plans/get/items_not_in_meal_plan', data);
}

export const addItemToMealPlan = (mealPlanId, itemId) => {
  const data = new FormData();
  data.append('meal_plan_id', mealPlanId);
  data.append('item_id', itemId);
  return Post('/meal_plans/add/item', data);
}

export const getServiceProviderProfile = () => {
  return Post('/user/get/service_provider_personal_info');
}

export const updateServiceProviderProfile = (name,  phoneNumber, emailAddress, description, address) => {
  const data = new FormData();
  data.append('name', name);
  data.append('phone_number', phoneNumber);
  data.append('email_address', emailAddress);
  data.append('description', description);
  data.append('address', address);
  return Post('/user/update/personal_info', data);
}

export const updateServiceProviderImage = (image) => {
  const data = new FormData();
  data.append('image', image);
  return Post('/user/update/personal_info_image_set', data);
}

export const getClientOrderHistory = () => {
  return Post('/orders/get/get_service_provider_orders');
}

export const getAllServiceProviderSubscribedClients = () => {
  return Post('user/get/all_subscribed_client');
}

export const cancelSubscribedClient = (subscribedClientId) => {
  const data = new FormData();
  data.append('subscribed_client_id', subscribedClientId);
  return Post('user/delete/subscribed_client', data);
}

export const sendMealToClient = (user_id, item_id) => {
  const data = new FormData();
  data.append('user_id', user_id);
  data.append('item_id', item_id);
  return Post('orders/add/send_meal', data);
}

export const changeMealPlanAvailability = (meal_plan_id) => {
  const data = new FormData();
  data.append('meal_plan_id', meal_plan_id);
  return Post('meal_plans/edit/set_availability', data);
}

export const changeMealAvailability = (item_id) => {
  const data = new FormData();
  data.append('item_id', item_id);
  return Post('items/edit/set_availability', data);
}

