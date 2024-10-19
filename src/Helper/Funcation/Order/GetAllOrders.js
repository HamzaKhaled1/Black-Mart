export default function GetAllOrders() {
  const orders = JSON.parse(localStorage.getItem("Orders"));
  return orders;
}
