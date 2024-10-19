import axios from "axios";
import { getToken } from "./../../../Funcation/LocalStorage/getToken";

export const addCoupon = async (coupon) => {
  console.log(coupon);
  const url = "http://localhost:3000/api/v1/coupon";

  const response = await axios.post(url, coupon, {
    headers: {
      "Content-Type": "application/json",
      token: `${getToken()}`,
    },
  });

  return response;
};
