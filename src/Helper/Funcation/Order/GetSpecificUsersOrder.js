import GetAllOrders from "./GetAllOrders"
export default function GetSpecificUsersOrder(id,index) {
    const orders=GetAllOrders()
    console.log(id)
    console.log(orders.map((order)=>order.userid))
    const userorders=orders.filter((order)=>order.userid===id)
    console.log(userorders)
    const order=userorders[index]
    console.log(order)
  return(order)
}
