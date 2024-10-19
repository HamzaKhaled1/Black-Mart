import { useEffect, useState } from "react";
import { getAllCoupons } from "../../Helper/Apis/Admin/Coupons/getAllCoupons";
import { Link } from "react-router-dom";
import { RiAddLine } from "react-icons/ri";
import CouponeCard from "./CouponeCard";
import style from "../../assets/CSS/Admin/CouponsContainer.module.css";

export default function CouponsContainer() {
  const [coupons, setCoupons] = useState([]);
  useEffect(() => {
    const getCoupons = async () => {
      try {
        let couponData = await getAllCoupons();
        // console.log(couponData.data.coupons);
        setCoupons(couponData.data.coupons);
      } catch (error) {
        console.log(error);
      }
    };
    getCoupons();
  }, [coupons]);
  return (
    <div className="p-3">
      <div className="heading">
        <p className="title">Coupons</p>
        <Link className="add-btn" to={`/admin/coupons/add`}>
          Add Coupon
          <RiAddLine />
        </Link>
      </div>
      <div className={style.CouponsContainer}>
        {coupons.map((coupon, index) => (
          <CouponeCard key={index} coupon={coupon} />
        ))}
      </div>
    </div>
  );
}
