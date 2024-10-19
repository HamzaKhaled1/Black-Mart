import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import style from "../../assets/CSS/Admin/OrderDetails.module.css"; 
import { getAllOrders } from "../../Helper/Apis/Admin/Orders/getAllOrders";

export default function OrderDetails() {
  const [orderData, setOrderData] = useState(null); 
  const { id } = useParams();

  useEffect(() => {
    const fetchOrder = async () => {
      const response = await getAllOrders(id);

      let orders = response.data.orders;

      let filteredOrder = orders.filter((order) => order._id === id);
      console.log(filteredOrder[0]);

      setOrderData(filteredOrder[0]);
    };
    fetchOrder();
  }, [id]);

  if (!orderData) {
    return <div>Loading...</div>; 
  }

  return (
    <div className={style.orderDetails}>
      <h1 className={style.heading}>Order Details</h1>
      <div className={style.orderInfo}>
        <p>
          <strong>Payment Method:</strong> {orderData.paymentMethod}
        </p>
        <p>
          <strong>Total Amount:</strong> {orderData.totalOrderPrice} EG
        </p>
        <p>
          <strong>Phone Number:</strong> {orderData.shippingAddress.phone}
        </p>
        <p>
          <strong>Address:</strong> {orderData.shippingAddress.street}{" "}
          {orderData.shippingAddress.city}
        </p>
        <p>
          <strong>Order Date:</strong>{" "}
          {new Date(orderData.createdAt).toLocaleDateString()}
        </p>
      </div>

      <h2 className={style.subheading}>Items</h2>
      <table className={style.table}>
        <thead>
          <tr>
            <th>Item</th>
            <th>Quantity</th>
            <th>Price</th>
            <th>Image</th>
            <th>Total</th>
          </tr>
        </thead>
        <tbody>
          {orderData.orderItems.map((item, index) => (
            <tr key={index}>
              <td>{item.product.name}</td>
              <td>{item.quantity}</td>
              <td>${item.price}</td>
              <td>
                <img
                  src={item.product.imgCover}
                  alt={item.name}
                  className={style.itemImage}
                />
              </td>
              <td>${item.price * item.quantity}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
