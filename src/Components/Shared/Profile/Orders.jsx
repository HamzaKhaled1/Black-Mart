import { useEffect, useState } from "react";
import GetUserOrders from "../../../Helper/Apis/Shared/Orders/GetUserOrders";

export default function Orders({ userOrders ,flag }) {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await GetUserOrders();
      console.log(response.data.orders);
      setData(response.data.orders);
    };
    fetchData();
  }, []);

  return (
    <div className={`bg-white p-16 rounded-lg w-full ${flag ? "hidden" : "block"}`}>
      <h2 className="text-3xl font-extrabold text-start mb-6">Your Orders</h2>
      {data.length === 0 ? (
        <p className="text-center text-gray-500">No orders found for this user</p>
      ) : (
        <div className="space-y-4 flex flex-col   gap-3">
          {data.map((order, orderIndex) => (
            <div
              key={orderIndex}
              className="border p-4 rounded-lg shadow-sm flex flex-col sm:w-[40rem]  h-min hover:scale-105 duration-150 cursor-pointer"
            >
              <p className="font-bold mb-4">Order {orderIndex + 1}</p>
              {order.orderItems.map((item, itemIndex) => (
                <div key={itemIndex} className="flex flex-col sm:flex-row gap-5 mb-4">
                  <img
                    src={item.product.imgCover}
                    alt="img"
                    className="w-32 h-32 rounded-2xl"
                  />
                  <div className="flex flex-col">
                    <p>Name: {item.product.name}</p>
                    <p>Quantity: {item.quantity}</p>
                    <p>Price: {item.product.price}</p>
                    <p>Total: {`${item.quantity * item.product.price}`}</p>
                    <p>Date: {new Date().toLocaleString()}</p>
                  </div>
                </div>
              ))}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
