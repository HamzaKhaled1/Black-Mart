import axios from "axios";
import { getToken } from "../../../Funcation/LocalStorage/getToken";

export const updateBrand = async (brandID, brand) => {
    const url = `http://localhost:3000/api/v1/brand/${brandID}`;

    const response = await axios.put(url, brand, {
        headers: {
            "Content-Type": "multipart/form-data",
            "token": `${getToken()}`,
        },
    });

    return response;
}