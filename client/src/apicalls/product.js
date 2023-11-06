import axios from "axios";
import { axiosInstance } from "./axiosInstance";

//sell product
export const sellProduct = async (payload) => {
  try {
    const response = await axiosInstance.post("/create-product", payload);
    return response.data;
  } catch (err) {
    return err.message;
  }
};
