import { Link, useNavigate } from "react-router-dom";
import { IoHomeOutline } from "react-icons/io5";
import { TbCategoryPlus } from "react-icons/tb";
import { AiOutlineProduct } from "react-icons/ai";
import { PiUsersThreeLight } from "react-icons/pi";
import { MdOutlineLocalShipping } from "react-icons/md";
import { LuLogOut } from "react-icons/lu";
import { TbCategory2 } from "react-icons/tb";
import { RiCoupon3Fill } from "react-icons/ri";

import style from "../../assets/CSS/Admin/SideBar.module.css";
import { deleteItemFromLS } from "../../Helper/Funcation/LocalStorage/DeleteItemFromLS";
import Swal from "sweetalert2";
import { getName } from "./../../Helper/Funcation/LocalStorage/GetName";
export default function SideBar() {
  const navigate = useNavigate();
  const handleLogout = () => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, Logout!",
    }).then((result) => {
      if (result.isConfirmed) {
        deleteItemFromLS("loginData");
        navigate("/login");
      }
    });
  };

  return (
    <div className={style.SideBar}>
      <div className={style.top}>
        <h2 className={style.heading}>Admin Dashbord</h2>
        <img
          src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
          alt="admin photo"
        />
        <p className={style.name}>Hello, {getName()}</p>
      </div>
      <div className={style.middle}>
        <ul>
          <li>
            <IoHomeOutline className={style.icon} />
            <Link to={"/admin/dashboard"}>Home</Link>
          </li>
          <li>
            <TbCategoryPlus className={style.icon} />
            <Link to={"/admin/categories"}>Categories</Link>
          </li>
          <li>
            <TbCategory2 className={style.icon} />
            <Link to={"/admin/subCategories"}>SubCategories</Link>
          </li>
          <li>
            <AiOutlineProduct className={style.icon} />
            <Link to={"/admin/products"}>Products</Link>
          </li>
          <li>
            <RiCoupon3Fill className={style.icon} />
            <Link to={"/admin/coupons"}>Coupons</Link>
          </li>
          <li>
            <MdOutlineLocalShipping className={style.icon} />
            <Link to={"/admin/orders"}>Orders</Link>
          </li>
          <li>
            <PiUsersThreeLight className={style.icon} />
            <Link to={"/admin/users"}>Users</Link>
          </li>
        </ul>
      </div>
      <div className={style.bottom}>
        <button className={style.logout} onClick={handleLogout}>
          {" "}
          Logout{" "}
        </button>
        <LuLogOut className={style.logoutIcon} />
      </div>
    </div>
  );
}
