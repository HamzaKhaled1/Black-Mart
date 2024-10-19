import axios from "axios";

export const signup = async (user) => {
    const url = "http://localhost:3000/api/v1/auth/signup";
    
    const response = await axios.post(url, user);
    
    return response;
}