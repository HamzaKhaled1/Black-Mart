import axios from "axios";
import { getToken } from "../../../Funcation/LocalStorage/getToken";

const CreateCheckout =async(id,shippingAddress1)=>{
    const response =await axios.post(`http://localhost:3000/api/v1/order/checkout/${id}`,
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
export default CreateCheckout