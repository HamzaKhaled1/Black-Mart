import axios from "axios"
import { getToken } from "../../../Funcation/LocalStorage/getToken"

const GetUserCoupouns =async()=>{
    const response = await axios.get("http://localhost:3000/api/v1/coupon/log",{
        headers:{
            "token":`${getToken}`
        }
    })
    console.log(response.data)
    return response.data

}