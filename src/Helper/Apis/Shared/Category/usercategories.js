import axios from "axios";
import { getToken } from "../../../Funcation/LocalStorage/getToken";

export const userCategories = async () => {
  const url = "http://localhost:3000/api/v1/categories";

  const response = await axios.get(url, {
    headers: {
      token: `${getToken()}`,
    },
  });
  console.log(response)
  return response.data.categories;
};
