import { getToken } from "../../../Funcation/LocalStorage/getToken"
import axios from "axios"
const ClearCart =async () => {
    const response= await axios.delete(`http://localhost:3000/api/v1/cart/`, {
        headers: {
          token: getToken(),
        }
    })
  return response
}

export default ClearCart
