import axios from 'axios'
import { getToken } from '../../../../Helper/Funcation/LocalStorage/getToken';
export default function AddReview(reviewData) {
    try{
    const response =axios.post("http://localhost:3000/api/v1/review",reviewData,{
        headers:{
            "Content-Type": "application/json",
            "token": `${getToken()}`,
        }
    });
  return (response)}catch(error){
    console.log("error on post review",error)
  }
}
