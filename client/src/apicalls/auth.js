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