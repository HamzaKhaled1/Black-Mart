import { getToken } from "../../../Funcation/LocalStorage/getToken";
import axios from "axios";

export const getSpecificProduct = async (productID) => {
  const url = `http://localhost:3000/api/v1/product/${productID}`;

  const response = await axios.get(url,{
    headers:{
    "token": `${getToken()}`,
    }
  });

  return response;
};
