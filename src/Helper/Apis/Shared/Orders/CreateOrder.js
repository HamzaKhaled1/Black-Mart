import axios from "axios";
import { getToken } from "../../../Funcation/LocalStorage/getToken";

const CreateOrder =async(id,shippingAddress1)=>{
  console.log(id)
    const response =await axios.post(`http://localhost:3000/api/v1/order/${id}`,
      {
        shippingAddress:{
        street: shippingAddress1.street,
        city: shippingAddress1.city ,
        phone: shippingAddress1.phone , 
      }
      },{
        headers:{
          "token": `${getToken()}`, 
        }
      })
      
    return response
}
export default CreateOrder