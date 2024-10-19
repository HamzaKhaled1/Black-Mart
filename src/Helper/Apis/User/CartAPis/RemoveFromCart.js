import { getToken } from "../../../Funcation/LocalStorage/getToken"
import axios from "axios"
const RemoveFromCart =async (id) => {
    const response= await axios.delete(`http://localhost:3000/api/v1/cart/${id}`, {
        headers: {
          token: getToken(),
        }
    })
    console.log(response)
  return response
}

export default RemoveFromCart
