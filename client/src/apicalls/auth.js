import { axiosInstance } from "./axiosInstance";

// register new acc
export const registerUser = async (payload) => {
  try {
    const response = await axiosInstance.post("/register", payload);
    console.log(response); 
    console.log(response.data);
    return response.data;
  } catch (error) {
    return error.message;
  }
};

// login account
export const loginUser = async (payload) => {
  try {
    const response = await axiosInstance.post("/login", payload, {
      validateStatus:()=> true,
    });
    console.log(response);
    return response.data;
  } catch (error) {
    return error.message;
  }
};
