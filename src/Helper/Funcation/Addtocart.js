export const checkLocalStorage=(name)=>{
if(localStorage.getItem(`${name}`)===false){
    localStorage.setItem(`${name}`,[])
}
}

export const addToCart = (product) => {
    checkLocalStorage("Cart");
    let cartData = localStorage.getItem("Cart");
    cartData = cartData ? JSON.parse(cartData) : [];
    cartData.push(product);
    localStorage.setItem("Cart", JSON.stringify(cartData));
};