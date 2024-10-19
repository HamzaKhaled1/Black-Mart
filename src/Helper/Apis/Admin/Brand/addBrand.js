import axios from "axios";
import { getToken } from "../../../Funcation/LocalStorage/getToken";

export const addBrand = async (brand) => {
    const url = "http://localhost:3000/api/v1/brand";

    const response = await axios.post(url, brand, {
        headers: {
            "Content-Type": "multipart/form-data",
            "token": `${getToken()}`,
        },
    });

    return response;
}