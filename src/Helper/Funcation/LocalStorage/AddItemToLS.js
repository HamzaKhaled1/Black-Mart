// export const addItemToLS = (name, item) => {
//     let data = localStorage.getItem(name);
//     if (data) {
//         data = JSON.parse(data);
//         data.push(item);
//         localStorage.setItem(name, JSON.stringify(data));
//     } else {
//         localStorage.setItem(name, JSON.stringify([item]));
//     }
// }


export const addItemToLS = (name, item) => {
  // Directly replace the old data with the new one
  localStorage.setItem(name, JSON.stringify([item])); // Store the new item as an array with one object
};
