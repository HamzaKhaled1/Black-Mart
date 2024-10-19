import InfoCard from "./InfoCard";

import style from "../../assets/CSS/Admin/HomeCards.module.css";

import { TbCategoryPlus } from "react-icons/tb";
import { AiOutlineProduct } from "react-icons/ai";
import { PiUsersThreeLight } from "react-icons/pi";
import { MdOutlineLocalShipping } from "react-icons/md";
import { useEffect, useState } from "react";
import { getAllProducts } from "./../../Helper/Apis/Shared/Product/getAllProducts";
import { getAllOrders } from "../../Helper/Apis/Admin/Orders/getAllOrders";
import { getAllUsers } from "../../Helper/Apis/Admin/Users/getAllUsers";
import { getAllCategories } from "../../Helper/Apis/Shared/Category/getAllCategories";

export default function HomeCards() {
  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState([]);
  const [users, setUsers] = useState([]);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    //get all products
    const getProducts = async () => {
      let ProductsData = await getAllProducts();
      setProducts(ProductsData.data.products);
    };
    getProducts();

    //get all orders
    const getOrders = async () => {
      let OrdersData = await getAllOrders();
      setOrders(OrdersData.data.orders);
    };
    getOrders();

    //get all users
    const getUsers = async () => {
      let UsersData = await getAllUsers();
      setUsers(UsersData.data.users);
    };
    getUsers();

    //get all categories
    const getCategories = async () => {
      let CategoriesData = await getAllCategories();
      setCategories(CategoriesData.data.categories);
    };
    getCategories();
  }, []);
  return (
    <div className={style.Cards}>
      <InfoCard
        icon={<PiUsersThreeLight />}
        iconColor={"#74C1ED"}
        name="Users"
        number={users.length}
        color="#F0F9FF"
      />
      <InfoCard
        icon={<TbCategoryPlus />}
        iconColor={"#EE95C5"}
        name="Categories"
        number={categories.length}
        color="#FEF6FB"
      />
      <InfoCard
        icon={<AiOutlineProduct />}
        iconColor={"#F6C762"}
        name="Products"
        number={products.length}
        color="#FEFBEC"
      />
      .
      <InfoCard
        icon={<MdOutlineLocalShipping />}
        iconColor={"#74C1ED"}
        name="Orders"
        number={orders.length}
        color="#F0F9FF"
      />
    </div>
  );
}
