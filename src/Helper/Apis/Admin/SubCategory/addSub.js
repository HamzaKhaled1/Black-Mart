import axios from "axios";
import { getToken } from "../../../Funcation/LocalStorage/getToken";

export const addSubCategory = async (subCategory) => {
  const url = "http://localhost:3000/api/v1/subcategory";

  const response = await axios.post(url, subCategory, {
    headers: {
      "Content-Type": "multipart/form-data",
      token: `${getToken()}`,
    },
  });

  console.log(response);

  return response;
};
