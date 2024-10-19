import axios from "axios";
import { getToken } from "../../../Funcation/LocalStorage/getToken";

export const updateCoupon = async (couponID, coupon) => {
  const url = `http://localhost:3000/api/v1/coupon/${couponID}`;

  const response = await axios.put(url, coupon, {
    headers: {
      "Content-Type": "application/json",
      token: `${getToken()}`,
    },
  });

  return response;
};
