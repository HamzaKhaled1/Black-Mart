/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import { RiDeleteBin6Fill } from "react-icons/ri";
import { FaPlus, FaMinus } from "react-icons/fa";
import GetCart from "../../../Helper/Apis/User/CartAPis/GetCart";
import UpdateCart from "../../../Helper/Apis/User/CartAPis/UpdateCart";

export default function ProductCartCard({ removeItem, setIsChange, isChange, data }) {
  const [cartData, setCartData] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  useEffect(() => {
    const fetchCartData = async () => {
      const cartResponse = await GetCart();
      if (cartResponse && cartResponse.cart) {
        setCartData(cartResponse.cart.cartItems);
      }
    };

    fetchCartData();
 
  }, [isChange]);

  // Recalculate the total price when `cartData` changes
  useEffect(() => {
    const calculateTotal = () => {
      const total = cartData.reduce((acc, product) => {
        return acc + product.product.price * product.quantity;
      }, 0);
      setTotalPrice(total);
    };

    calculateTotal();
  }, [cartData]); // Recalculate the total price whenever cartData changes
  // Update the item quantity in the cart
  const updateItemQuantity = async (productId, newQuantity) => {
    const productToUpdate = cartData.find((product) => product.product.id === productId);

    if (productToUpdate) {
      // Optimistic UI update: update the UI first
      const updatedCartData = cartData.map((product) => {
        if (product.product.id === productId) {
          return { ...product, quantity: newQuantity };
        }
        return product;
      });

      setCartData(updatedCartData); // Update the cart state immediately

      try {
        await UpdateCart(productToUpdate._id, newQuantity);
      } catch (error) {
        console.error("Failed to update quantity:", error);
      }
    }
  };

  return (
    <>
      <div className={`${cartData.length > 0 ? "flex flex-col" : "hidden"}`}>
        {cartData.length > 0 ? (
          cartData.map((product) => (
            <div key={product.product.id} className="sm:w-[30rem] sm:h-56 border pt-5 p-2 gap-3 sm:p-5 sm:gap-5 rounded-3xl flex mb-4">
              <img
                src={product.product.imgCover}
                alt={product.product.name}
                className="h-28 w-28 rounded-3xl sm:border-2 border-black"
              />

              <div className="flex justify-between flex-col gap-3 w-full">
                <div className="flex justify-between gap-5 items-center">
                  <p className="sm:text-2xl font-bold">{product.product.name}</p>
                  <RiDeleteBin6Fill
                    className="hover:text-red-100 text-black text-xl cursor-pointer"
                    onClick={() => removeItem(product._id)}
                  />
                </div>
                <p>
                  <span className="font-bold">Size:</span>{" "}
                  <span className="opacity-65">{product.size}</span>
                </p>
                <p>
                  <span className="font-bold">Color:</span>{" "}
                  <span className="opacity-65">{product.product.color.filter((color) => color === product.color)}</span>
                </p>
                <div className="flex justify-between items-center">
                  <p className="sm:text-3xl font-bold">${product.product.price}</p>

                  <div className="rounded-full gap-7 items-center bg-slate-300 p-2 cursor-pointer flex">
                    <FaMinus
                      onClick={() => {
                        if (product.quantity > 1) {
                          updateItemQuantity(product.product.id, product.quantity - 1); 
                          setIsChange(!isChange);
                        }
                      }}
                    />
                    <p className="text-xl font-bold">{product.quantity}</p>
                    <FaPlus
                      onClick={() => {
                        updateItemQuantity(product.product.id, product.quantity + 1);
                        setIsChange(!isChange);

                      }}
                    />
                  </div>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p className="text-3xl font-bold">No items in cart!</p>
        )}
      </div>

    </>
  );
}
