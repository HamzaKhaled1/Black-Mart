import axios from "axios";

export const signin = async (user) => {
    const url = "http://localhost:3000/api/v1/auth/login";

    const response = await axios.post(url, user);
    
    return response;
}