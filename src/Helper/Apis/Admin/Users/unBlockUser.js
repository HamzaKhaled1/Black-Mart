import axios from "axios";
import { getToken } from "../../../Funcation/LocalStorage/getToken";

export const unBlockUser = async (userID) => {
  const url = `http://localhost:3000/api/v1/user/unblock/${userID}`;
  const response = await axios.patch(
    url,
    {},
    {
      headers: {
        token: `${getToken()}`,
      },
    }
  );
  return response;
};
