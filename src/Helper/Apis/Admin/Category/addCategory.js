import axios from "axios";
import { getToken } from "../../../Funcation/LocalStorage/getToken";

export const addCategory = async (category) => {
  const url = "http://localhost:3000/api/v1/categories";

  const response = await axios.post(url, category, {
    headers: {
      "Content-Type": "multipart/form-data",
      "token": `${getToken()}`,
    },
  });

  return response;
};