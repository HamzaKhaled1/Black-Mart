import axios from "axios";
import { getToken } from "../../../Funcation/LocalStorage/getToken";

export const deleteBrand = async (brandID) => {
    const url = `http://localhost:3000/api/v1/brand/${brandID}`;

    const response = await axios.delete(url, {
        headers: {
            "Content-Type": "multipart/form-data",
            "token": `${getToken()}`,
        },
    });

    return response;
}