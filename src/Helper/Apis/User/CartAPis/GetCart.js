import axios from "axios";
import { getToken } from "../../../Funcation/LocalStorage/getToken";

const GetCart = async () => {
  try {
    const response = await axios.get("http://localhost:3000/api/v1/cart/log", {
      headers: {
        token: getToken(),
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching the cart:", error);
    return null; 
  }
};

export default GetCart;
