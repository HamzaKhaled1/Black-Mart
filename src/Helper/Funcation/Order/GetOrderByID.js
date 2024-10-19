import GetAllOrders from "./GetAllOrders";

export const getOrderByID = (id) => {
  const orders = GetAllOrders();
  const order = orders.filter((order) => order.id === id);
  console.log(order);
  return order;
};
