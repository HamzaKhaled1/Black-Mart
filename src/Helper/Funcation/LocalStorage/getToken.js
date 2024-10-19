import { getItemFromLS } from "./GetItemFromLS";

export const getToken = () => {
    const logingData = getItemFromLS("loginData");

    // Check if logingData is defined and is an array with at least one item
    if (logingData && Array.isArray(logingData) && logingData.length > 0) {
        return logingData[0].token;
    } else {
        // console.error("Token not found or logingData is empty");
        return null; // Return null or handle the case as appropriate
    }
};
