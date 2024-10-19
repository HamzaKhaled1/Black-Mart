import axios from "axios";
import { getToken } from "../../../Funcation/LocalStorage/getToken";
const GetAllReviews = async () => {
  try {
    const response = await axios.get("http://localhost:3000/api/v1/review",{
      headers:{
        "token":`${getToken()}`
      }
    });

    return response.data.reviews;  
  } catch (error) {
    console.error("Error fetching reviews:", error);
    
    return null;
  }
}

export default GetAllReviews;
