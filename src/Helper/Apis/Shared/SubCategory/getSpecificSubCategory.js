import axios from "axios";
import { getToken } from "../../../Funcation/LocalStorage/getToken";

export const getSpecificSubCategory = async (subcategoryID) => {
  const url = `http://localhost:3000/api/v1/subcategory/${subcategoryID}`;

  try {
    const response = await axios.get(url, {
      headers: {
        "token": `${getToken()}`, 
      },
    });
    return response.data; 
  } catch (error) {
    
    console.error("Error fetching category:", error.message);
    
    
    throw new Error("Failed to fetch subCategory. Please try again later.");
  }
};
