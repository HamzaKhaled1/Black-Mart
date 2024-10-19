import axios from "axios";
import { getToken } from "../../../Funcation/LocalStorage/getToken";

export const updateCategory = async (categoryID, category) => {
    const url = `http://localhost:3000/api/v1/categories/${categoryID}`;

    const response = await axios.put(url, category, {
        headers: {
            "Content-Type": "multipart/form-data",
            "token": `${getToken()}`,
        },
    });
    
    return response;
}