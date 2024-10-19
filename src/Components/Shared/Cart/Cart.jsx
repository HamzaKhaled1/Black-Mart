/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
/* eslint-disable react/no-unescaped-entities */
import { useEffect, useState } from "react";
import Header from "../Header/Header.jsx";
import Footer from "../Footer/Footer.jsx";
import Signupoffer from "../Signupoffer/Signupoffer.jsx";
import ProductCartCard from "./ProductCartCard.jsx";
import { Link, useNavigate } from "react-router-dom"; // Replaced useHistory with useNavigate
import GetCart from "../../../Helper/Apis/User/CartAPis/GetCart.js";
import RemoveFromCart from "../../../Helper/Apis/User/CartAPis/RemoveFromCart.js";
import ClearCart from "../../../Helper/Apis/User/CartAPis/ClearCart.js";
import Swal from "sweetalert2";
import { TbCash } from "react-icons/tb";
import { LiaCcVisa } from "react-icons/lia";
import CheckCoupoun from "../../../Helper/Funcation/CheckCoupoun.js";

export default function Cart() {
  const [data, setData] = useState([]);
  const [cartId,setCartId]=useState()
  const [subtotal, setSubtotal] = useState(0);
  const [isChange, setIsChange] = useState(false);
  const [total, setTotal] = useState(0);
  const [Coupon, setCoupon] = useState([]);
  const [coupounvalidate, setCoupounvalidate] = useState(false);
  const [coupounDiscount, setCoupounDiscount] = useState(0);

  useEffect(() => {
    const fetchCartData = async () => {
      try {
        const cartData = await GetCart();
        if (cartData && cartData.cart) {
          setData(cartData.cart.cartItems);
          setCartId(cartData.cart._id)
          setTotal(cartData.cart.totalPrice);
        }
      } catch (error) {
        console.error("Failed to fetch cart data", error);
      }
    };
    fetchCartData();
  }, [isChange]);
  const coupounInputHandler = (e) => {
    setCoupon(e.target.value);
  }

  const CheckCoupounHandler =async (e) => {
    e.preventDefault();
    if (Coupon) {
      const response =await CheckCoupoun(Coupon);
      if (response) {
        console.log(response);
        console.log("coupon valied");
        setCoupounvalidate(true);
        setCoupounDiscount(response.discount);
      }
      else {
        console.log("coupon not valied");
        setCoupounvalidate(false);
      }
    }
  }
  console.log(coupounDiscount)
  // Handle clearing the cart
  const ClearCartHandler = async () => {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await ClearCart();
          setData([]);
          Swal.fire(
            'Deleted!',
            'Your cart has been cleared.',
            'success'
          );
        } catch (error) {
          console.error("Error clearing cart", error);
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Something went wrong!'
          });
        }
      }
    });
  };

  // Recalculate the subtotal whenever cart data changes
  useEffect(() => {
    if (data) {
      const subtotalValue = data.reduce(
        (acc, item) => acc + item.price * item.quantity,
        0
      );
      setSubtotal(subtotalValue);
    } else {
      setSubtotal(0);
    }
  }, [data]);

  // Remove item from cart and update the cart state
  const removeItem = async (productId) => {
    try {
      await RemoveFromCart(productId);
      const updatedCartData = await GetCart();
      if (updatedCartData && updatedCartData.cart) {
        setData(updatedCartData.cart.cartItems);
      }
    } catch (error) {
      console.error("Error removing item from cart", error);
    }
  };

  const items = [
    { name: "Subtotal", value: total },
    { name: "Discount", value: data.length ? total * coupounDiscount/100 : 0 }, 
    { name: "Delivery Fee", value: data.length ? 15 : 0 },
  ];

  const discount = items.find((item) => item.name === "Discount").value;
  const deliveryFee = items.find((item) => item.name === "Delivery Fee").value;
  const totalAmount = subtotal - discount + deliveryFee;

  return (
    <div className="block">
      <Signupoffer />
      <Header />
      <div className="h-0.5 w-full bg-black opacity-20 mt-4 mb-4"></div>
      <div className="flex flex-col gap-8 p-5">
        <div className="w-full flex justify-between">
          <p className="sm:text-5xl text-3xl font-extrabold">YOUR CART</p>
          {data.length > 0 && (
            <div className="bg-red-100 p-2 rounded-2xl  cursor-pointer flex items-center hover:bg-red-500" onClick={ClearCartHandler}>
              <span className="text-white  font-semibold">Clear Cart</span>
            </div>
          )}
        </div>
        {data.length > 0 ? (
          <div className="flex flex-col sm:flex-row justify-evenly">
            <div className="flex flex-col items-center">
              <ProductCartCard
                data={data}
                removeItem={removeItem}
                setIsChange={setIsChange}
                isChange={isChange}
              />
            </div>
            <div className="border sm:w-96 rounded-2xl p-10  flex flex-col">
              <p className="text-xl font-bold mb-10">Order Summary</p>
              <ul className="flex flex-col gap-6">
                {items.map((item, index) => (
                  <li key={index} className="flex justify-between text-md">
                    <span className="opacity-70">{item.name}</span>
                    <span
                      className={`font-bold text-xl ${item.name === "Discount" ? "text-red-100" : "text-black"}`}
                    >
                      $ {item.value}
                    </span>
                  </li>
                ))}
              </ul>
              <div className="h-0.5 w-auto bg-black opacity-20 mt-4 mb-4"></div>
              <div className="flex justify-between">
                <span className="text-lg font-bold">Total</span>
                <span>$ {totalAmount}</span>
              </div>
              <div className="h-0.5 w-auto bg-black opacity-20 mt-4 mb-4 "></div>
              <form className="flex justify-between" onSubmit={CheckCoupounHandler}>
                 <input 
                  type="text" 
                  placeholder="Enter coupoun code" 
                  className={`outline-none border p-1 rounded-xl border-gray-300 ${coupounvalidate?"border-li-500":""}`} 
                  onChange={coupounInputHandler}

                />
                <button className="bg-black text-white p-2 rounded-xl hover:bg-slate-800">Apply</button>
              </form>
             
              <div className="h-0.5 w-auto bg-black opacity-20  mt-4 mb-4"></div>
              <div className="flex flex-col gap-3">
                <p className="text-lg font-semibold">Choose the Payment Method</p>
                <div className="flex justify-between">
                  <Link to={`/order/${cartId}`}>
                  <span className="flex cursor-pointer items-center gap-3 font-bold" onClick={() => { handlePayment("cash"); handleOrderCreation(); }}>
                    Cash <TbCash className="text-xl text-lime-500" />
                  </span>
                  </Link>
                  <Link to={`/order/checkout/${cartId}`}>
                  <span className="flex cursor-pointer items-center gap-3 font-bold" onClick={() => { handlePayment("stripe"); handleOrderCreation(); }}>
                    Credit Card <LiaCcVisa className="text-xl text-blue-500" />
                  </span>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <p className="text-3xl font-bold">No items in cart!</p>
        )}
      </div>
      <Footer />
    </div>
  );
}
