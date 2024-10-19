import GetAllOrders from "./GetAllOrders";
export default function GetSpecificUsersOrders(id) {
  const orders = GetAllOrders();
  console.log(id);
  console.log(orders.map((order) => order.userid));
  const order = orders.filter((order) => order.userid === id);
  console.log(order);
  return order;
}
