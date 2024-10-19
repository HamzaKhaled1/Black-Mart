import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getAllOrders } from "../../Helper/Apis/Admin/Orders/getAllOrders";
import style from "../../assets/CSS/Admin/OrderTables.module.css";
import { getSpecificUser } from "../../Helper/Apis/Admin/Users/getSpecificUser";

export default function OrdersTables() {
  const [orders, setOrders] = useState([]);
  const [error, setError] = useState(null);
  const [userDetails, setUserDetails] = useState({});
  const [loadingUser, setLoadingUser] = useState(true);

  // Fetch orders when component mounts
  useEffect(() => {
    const getOrders = async () => {
      try {
        const ordersData = await getAllOrders();
        if (ordersData?.data?.orders) {
          setOrders(ordersData.data.orders);
          // console.log(ordersData.data.orders);
        } else {
          throw new Error("No orders found");
        }
      } catch (error) {
        console.error("Error fetching orders:", error);
        setError(error.message);
      }
    };

    getOrders();
  }, []);

  useEffect(() => {
    const fetchUserDetails = async () => {
      setLoadingUser(true);
      const details = {};
      for (const order of orders) {
        if (order.user) {
          try {
            const userData = await getSpecificUser(order.user);
            // console.log(userData.data.user.username);
            if (userData?.data?.user?.username) {
              details[order.user] = userData.data.user.username;
            } else {
              console.warn(
                `User data returned empty for user ID: ${order.user}`
              );
              details[order.user] = "Unknown User";
            }
          } catch (error) {
            console.error(`Error fetching user for order ${order._id}:`, error);
            details[order.user] = "Unknown User";
          }
          console.log("User details:", details);
        } else {
          console.warn(`Order ${order._id} does not have a valid user ID.`);
          details[order.user] = "Unknown User";
        }
      }
      setUserDetails(details);
      setLoadingUser(false);
    };

    if (orders.length > 0) {
      fetchUserDetails();
    }
  }, [orders]);

  return (
    <div className={style.ordertables}>
      <div className="title">Orders List</div>
      {error ? (
        <p className="text-red-500">{error}</p>
      ) : loadingUser ? (
        <p>Loading users...</p>
      ) : orders.length > 0 ? (
        <table>
          <thead>
            <tr>
              <th>User Name</th>
              <th>Payment Method</th>
              <th>Phone Number</th>
              <th>Address</th>
              <th>Order Date</th>
              <th>Total</th>
              <th>Control</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order._id}>
                <td>{userDetails[order.user] || "Loading..."}</td>{" "}
                <td>{order.paymentMethod}</td>
                <td>{order.shippingAddress.phone}</td>
                <td>
                  {order.shippingAddress.street} {order.shippingAddress.city}
                </td>
                <td>{new Date(order.createdAt).toLocaleDateString()}</td>
                <td>{order.totalOrderPrice}</td>
                <td>
                  <Link
                    to={`/admin/orders/${order._id}`}
                    className={style.ShowButton}
                  >
                    Show
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No orders found.</p>
      )}
    </div>
  );
}
