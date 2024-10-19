import axios from "axios"
import { getToken } from "../../../Funcation/LocalStorage/getToken"
const GetUserOrders =async () => {
    const response=await axios.get("http://localhost:3000/api/v1/order",{
      headers:{
        "token": `${getToken()}`, 
      }
    })
    
  return response
}

export default GetUserOrders
