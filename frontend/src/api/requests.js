import { Get, Post } from "./setup";

export const signUpClient = (email, password, firstName, lastName, phoneNumber) => {
  const data = new FormData();
  data.append('first_name', firstName);
  data.append('last_name', lastName);
  data.append('phone_number', phoneNumber);
  data.append('email', email);
  data.append('password', password);
  return Post('/auth/signup/user', data);
}
