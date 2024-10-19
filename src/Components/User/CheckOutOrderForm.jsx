import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import { generateUniqueId } from "../../Helper/Funcation/GenerateID";
import GetCart from "../../Helper/Apis/User/CartAPis/GetCart";
import ClearCart from "../../Helper/Apis/User/CartAPis/ClearCart";
import CreateCheckout from "../../Helper/Apis/Shared/Orders/CreateCheckoutSession";
export default function CheckOutOrderForm() {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [street, setStreet] = useState("");
  const [city, setCity] = useState("");
  const [cartData, setCartData] = useState({});
  const [cartId,setCartId]=useState()
  const navigate = useNavigate();

  const loginData = JSON.parse(localStorage.getItem("loginData"));

  useEffect(() => {
    const fetchCart = async () => {
      const response = await GetCart();
      console.log(response.cart);
      setCartId(response.cart._id)
      setCartData(response.cart.cartItems);
    };
    fetchCart();
  }, []);
  
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Updated validation regex
    const phoneRegex = /^\d{10,}$/;

    if (!phoneRegex.test(phoneNumber)) {
      Swal.fire({
        title: "Invalid Phone Number!",
        text: "Phone number must be at least 10 digits long.",
        icon: "error",
        confirmButtonText: "OK",
      });
      return;
    }

    if (street.trim() === "" || city.trim() === "") {
      Swal.fire({
        title: "Invalid Address!",
        text: "Address fields cannot be empty.",
        icon: "error",
        confirmButtonText: "OK",
      });
      return;
    }

    const shippingAddress = {
      street:street,
      phone: phoneNumber,
      city:city,
    };

    try {
      const response=await CreateCheckout(cartId,shippingAddress)
      console.log("Order checkout Response:", response);
      console.log(response.data.session.url)
      window.open(`${response.data.session.url}`,"_blank");
      navigate("/")
      ClearCart()
      setPhoneNumber("");
      setStreet("");
      setCity("");
    } catch (error) {
      Swal.fire({
        title: "Error !",
        text: "Something went wrong. Please try again later.",
        icon: "error",
        confirmButtonText: "OK",
      });
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold text-center mb-6">Order Form</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="tel"
            placeholder="Phone Number"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            required
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-500"
          />
          <input
            type="text"
            placeholder="Street"
            value={street}
            onChange={(e) => setStreet(e.target.value)}
            required
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-500"
          />
          <input
            type="text"
            placeholder="City"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            required
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-500"
          />

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-3 rounded-md hover:bg-blue-700 transition duration-200"
          >
            Go to PAY 
          </button>
        </form>
      </div>
    </div>
  );
}
