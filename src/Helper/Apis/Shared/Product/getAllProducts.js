import axios from "axios";
import { getToken } from "../../../Funcation/LocalStorage/getToken";

export const getAllProducts = async () => {
  const url = "http://localhost:3000/api/v1/product";

  const response = await axios.get(url, {
    headers: {
      token: `${getToken()}`,
    },
  });

  return response;
};

getAllProducts();
