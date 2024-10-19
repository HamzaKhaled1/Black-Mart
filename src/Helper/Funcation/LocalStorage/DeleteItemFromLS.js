export const deleteItemFromLS = (name) => {
    let data = localStorage.getItem(name);
    if (data) {
        localStorage.removeItem(name);
        return true;
    } else {
        return false;
    }
};
