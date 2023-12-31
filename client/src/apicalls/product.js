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

// get all products
export const getAllProducts = async () => {
  try {
    const response = await axiosInstance.get("/products");
    return response.data;
  } catch (error) {
    return error.message;
  }
};

// get an old product
export const getOldProduct = async (id) => {
  try {
    const response = await axiosInstance.get(`/products/${id}`);
    return response.data;
  } catch (error) {
    return error.message;
  }
};

// update product
export const updateProduct = async (payload) => {
  try {
    const repsonse = await axiosInstance.post("/update-product", payload);
    return repsonse.data;
  } catch (error) {
    return error.message;
  }
};

export const deleteProduct = async (id) => {
  try {
    const response = await axiosInstance.delete(`/products/${id}`, {
      validateStatus: () => true,
    });
    return response.data;
  } catch (error) {
    return error.message;
  }
};
