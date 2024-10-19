import axios from "axios"
import { getToken } from "../../../Funcation/LocalStorage/getToken"
const GetAllOrders =async () => {
    const response=await axios.get("http://localhost:3000/api/v1/order/allorder",{
      headers:{
        "token": `${getToken()}`, 
      }
    })
    
  return response
}

export default GetAllOrders
