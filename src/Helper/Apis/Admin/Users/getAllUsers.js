import axios from "axios"
import { getToken } from "../../../Funcation/LocalStorage/getToken"

export const getAllUsers = async () => {

    const url = "http://localhost:3000/api/v1/user";

    const response = await axios.get(url, {
        headers: {
            token: `${getToken()}`
        }
    })

    return response
}
