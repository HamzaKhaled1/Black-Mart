import axios from "axios";
import { getToken } from "../../../Funcation/LocalStorage/getToken";

export const deleteCategory = async (categoryID) => {
  const url = `http://localhost:3000/api/v1/categories/${categoryID}`;

  const response = await axios.delete(url,{
    headers: {
      "token": `${getToken()}`,
    },
  }
  );

  return response;
};
