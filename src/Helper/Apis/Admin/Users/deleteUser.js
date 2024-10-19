import axios from "axios";
import { getToken } from "../../../Funcation/LocalStorage/getToken";

export const deleteUser = async (userID) => {
    const url = `http://localhost:3000/api/v1/user/${userID}`;

    const response = await axios.delete(url, {
        headers: {
            token: `${getToken()}`,
        },
    });

    return response;
}