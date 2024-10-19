import axios from "axios";
import { getToken } from "../../../Funcation/LocalStorage/getToken";

export const getSpecificCategory = async (categoryID) => {
  const url = `http://localhost:3000/api/v1/categories/${categoryID}`;

  try {
    const response = await axios.get(url, {
      headers: {
        "token": `${getToken()}`, 
      },
    });

    return response.data; 
  } catch (error) {
    
    console.error("Error fetching category:", error.message);
    
    
    throw new Error("Failed to fetch category. Please try again later.");
  }
};
