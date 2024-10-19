import axios from "axios";
import { getToken } from "../../../Funcation/LocalStorage/getToken";

export const updateSubCategory = async (subCategoryID, subCategory) => {
    const url = `http://localhost:3000/api/v1/subcategory/${subCategoryID}`;

    const response = await axios.put(url, subCategory, {
        headers: {
            "Content-Type": "multipart/form-data",
            "token": `${getToken()}`,
        },
    });

    return response;
}