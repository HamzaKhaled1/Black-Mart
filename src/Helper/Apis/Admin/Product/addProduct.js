import axios from "axios";
import { getToken } from "../../../Funcation/LocalStorage/getToken";

export const addProduct = async (product) => {
  console.log(product);
  const url = "http://localhost:3000/api/v1/product";
  try {
    const response = await axios.post(url, product, {
      headers: {
        "Content-Type": "multipart/form-data",
        token: `${getToken()}`,
      },
    });
    return response;
  } catch (error) {
    console.error("Full error object:", error);
  }
};
