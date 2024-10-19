import { getToken } from "../../../Funcation/LocalStorage/getToken";
import axios from "axios";

const UpdateCart = async (id, quantity) => {
  try {
    const response = await axios.patch(
      `http://localhost:3000/api/v1/cart/${id}`,
      { quantity },
      {
        headers: {
          token: getToken(),
        },
      }
    );
    console.log(response.data); 
    return response.data;
  } catch (error) {
    console.error("Error updating cart:", error.response?.data || error.message);
    throw error; 
  }
};

export default UpdateCart;
