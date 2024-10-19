export const getItemFromLS = (name) => {
    let data = localStorage.getItem(name);
    if (data) {
        data = JSON.parse(data);
        return data;
    } else {
        return [];
    }
}