import axios from "axios";
import { getToken } from "../../../Funcation/LocalStorage/getToken";

export const updateProduct = async (productID, product) => {
  const url = `http://localhost:3000/api/v1/product/${productID}`;

  const response = await axios.put(url, product, {
    headers: {
      "Content-Type": "multipart/form-data",
      token: `${getToken()}`,
    },
  });

  return response;
};
