import axios from "axios";
import { getToken } from "../../../Funcation/LocalStorage/getToken";

export const deleteCoupon = async (couponID) => {
    const url = `http://localhost:3000/api/v1/coupon/${couponID}`;

    const response = await axios.delete(url, {
        headers: {
            token: `${getToken()}`,
        },
    });

    return response;
}