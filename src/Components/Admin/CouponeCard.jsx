/* eslint-disable react/prop-types */
import { Link } from "react-router-dom";
import { FaPercent } from "react-icons/fa";
import { GrValidate } from "react-icons/gr";
import { FaCalendarXmark } from "react-icons/fa6";
import { RxUpdate } from "react-icons/rx";
import { MdDelete } from "react-icons/md";
import Swal from "sweetalert2";
import { deleteCoupon } from "../../Helper/Apis/Admin/Coupons/deleteCoupone";
import { extractDate } from "../../Helper/Funcation/extractDate";
import { getNowDate } from "../../Helper/Funcation/getNowDate";
import style from "../../assets/CSS/Admin/CouponeCard.module.css";

export default function CouponeCard({ coupon }) {
  const handleDeleteCoupon = async (id) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    });

    if (result.isConfirmed) {
      try {
        const response = await deleteCoupon(id);
        if (response.status === 200) {
          Swal.fire({
            icon: "success",
            title: "Deleted!",
            showConfirmButton: false,
            timer: 1500,
          });
        } else {
          throw new Error("Failed to delete coupon");
        }
      } catch (error) {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Something went wrong while deleting the coupon.",
        });
        console.error("Error deleting coupon:", error);
      }
    }
  };

  const isExpired = getNowDate() > coupon.expiry;

  return (
    <div className={style.CouponeCard}>
      <div className={style.couponeInfo}>
        <div className={style.couponeDiscountContainer}>
          <p className={style.couponeDiscount}>{coupon.discount}</p>
          <FaPercent />
        </div>
        <p className={style.couponeCode}>
          <span>Code: </span> {coupon.code}
        </p>
        <p className={style.couponeExpiry}>
          <span className={style.couponeDate}>
            <span>Ending: {extractDate(coupon.expiry)}</span>
            {isExpired ? (
              <span className={style.couponeExpired}>
                Expired <FaCalendarXmark />
              </span>
            ) : (
              <span className={style.couponeValid}>
                Valid <GrValidate />
              </span>
            )}
          </span>
        </p>
      </div>

      <div className={style.couponeActions}>
        <Link
          className={style.couponeUpdate}
          to={`/admin/coupons/edit/${coupon._id}`}
        >
          Update <RxUpdate />
        </Link>
        <button
          className={style.couponeDelete}
          onClick={() => handleDeleteCoupon(coupon._id)}
        >
          Delete <MdDelete />
        </button>
      </div>
    </div>
  );
}
