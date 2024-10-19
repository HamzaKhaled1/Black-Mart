import axios from "axios";
import { getToken } from "../../../Funcation/LocalStorage/getToken";

const AddtoCart = async (Cart) => {
try {
    const response = await axios.post(
      "http://localhost:3000/api/v1/cart",
      {
        product: Cart.product,
        quantity: Cart.data.quantity || 1,
        color: Cart.data.color || "red", 
        size: Cart.data.size,
      },
      {
        headers: {
          token: getToken(),
        },
      }
    );

    return response;
  } catch (error) {
    console.error("Error adding product to cart:", error.response?.data || error.message);
    throw error;
  }
};

export default AddtoCart;
