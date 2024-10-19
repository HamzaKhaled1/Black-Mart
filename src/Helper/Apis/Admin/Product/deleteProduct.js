import axios from "axios";
import { getToken } from "../../../Funcation/LocalStorage/getToken";

export const deleteProduct = async (productID) => {
  const url = `http://localhost:3000/api/v1/product/${productID}`;

  const response = await axios.delete(url, {
    headers: {
      token: `${getToken()}`,
    },
  });

  return response;
};
