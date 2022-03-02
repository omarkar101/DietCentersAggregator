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
