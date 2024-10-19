import axios from "axios";
import { getToken } from "../../../Funcation/LocalStorage/getToken";

export const blockUser = async (userID) => {
    const url = `http://localhost:3000/api/v1/user/block/${userID}`;
    const response = await axios.patch(url, {}, {
        headers: {
            token: `${getToken()}`,
        },
    });
    return response;
}