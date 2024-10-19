import axios from "axios"
import { getToken } from "../../../Funcation/LocalStorage/getToken"
const DeleteReview =async (id) => {
    const response=axios.delete(`http://localhost:3000/api/v1/review/${id}`,{
        headers:{
            "token":`${getToken()}`
        }
    })
  return (response)
}

export default DeleteReview
