import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getAllCoupons } from "../../Helper/Apis/Admin/Coupons/getAllCoupons";
import style from "../../assets/CSS/Admin/AddCategoryForm.module.css";
import { updateCoupon } from "./../../Helper/Apis/Admin/Coupons/updateCoupon";
import { toast, ToastContainer } from "react-toastify";
import Swal from "sweetalert2";
import "react-toastify/dist/ReactToastify.css";
import { FaBarcode } from "react-icons/fa";
import { BsPatchMinus } from "react-icons/bs";
import { MdDateRange } from "react-icons/md";
import { RxUpdate } from "react-icons/rx";

export default function UpdateCouponeForm() {
  const { id } = useParams();
  const [coupon, setCoupon] = useState({
    code: "",
    discount: "",
    expiry: "",
  });

  const [errors, setErrors] = useState({
    code: "",
    discount: "",
    expiry: "",
  });

  useEffect(() => {
    const getSpecificCoupon = async () => {
      try {
        let coupons = await getAllCoupons();
        let specificCoupon = coupons.data.coupons.find(
          (coupon) => coupon._id === id
        );

        if (specificCoupon) {
          setCoupon({
            code: specificCoupon.code,
            discount: specificCoupon.discount,
            expiry: specificCoupon.expiry,
          });
        }
      } catch (error) {
        console.error("Error fetching coupons:", error);
      }
    };

    getSpecificCoupon();
  }, [id]);

  useEffect(() => {
    console.log("Updated coupon:", coupon); // This will log the updated coupon state whenever it changes
  }, [coupon]);

  const validForm = () => {
    let isValid = true;
    let newErrors = {};

    if (!coupon.code) {
      newErrors.code = "Code is required";
      isValid = false;
    }

    if (!coupon.discount) {
      newErrors.discount = "Discount is required";
      isValid = false;
    } else if (!/^\d+(\.\d{1,2})?$/.test(coupon.discount)) {
      newErrors.discount = "Discount must be a valid number";
      isValid = false;
    }

    if (!coupon.expiry) {
      newErrors.expiry = "Expiry is required";
      isValid = false;
    } else if (!/^\d{4}-\d{2}-\d{2}$/.test(coupon.expiry)) {
      newErrors.expiry = "Expiry must be a valid date";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setCoupon({ ...coupon, [name]: value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!validForm()) {
      return;
    }

    console.log("Updated coupon:", coupon);

    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, update it!",
    }).then((result) => {
      if (result.isConfirmed) {
        const formData = new FormData();
        formData.append("code", coupon.code);
        formData.append("discount", parseInt(coupon.discount));
        formData.append("expiry", coupon.expiry.replace(/-/g, "/"));
        try {
          const response = updateCoupon(id, formData);
          console.log("response", response);
          toast.success("Category has been updated successfully!", {
            position: "top-right",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
          });
        } catch (error) {
          console.error("Error updating category:", error);
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Something went wrong!",
          });
        }
      }
    });
  };

  return (
    <div className={style.formContainer}>
      <h2 className={`${style.formTitle}`}>Update Coupon Form</h2>
      <form onSubmit={handleSubmit}>
        <div className={style.inputContainer}>
          <label htmlFor="code">Code</label>
          <div className={style.inputField}>
            <div className={style.icon}>
              <FaBarcode className={style.icon} />
            </div>
            <input
              type="text"
              name="code"
              id="code"
              placeholder="Enter Coupon Name"
              onChange={handleChange}
              value={coupon.code}
            />
          </div>
          {errors.code && <span className={style.error}>{errors.code}</span>}
        </div>

        <div className={style.inputContainer}>
          <label htmlFor="discount">Discount</label>
          <div className={style.inputField}>
            <div className={style.icon}>
              <BsPatchMinus className={style.icon} />
            </div>
            <input
              type="text"
              name="discount"
              id="discount"
              placeholder="Enter Coupon Discount"
              onChange={handleChange}
              value={coupon.discount}
            />
          </div>
          {errors.discount && (
            <span className={style.error}>{errors.discount}</span>
          )}
        </div>

        <div className={style.inputContainer}>
          <label htmlFor="expiry">Expiry</label>
          <div className={style.inputField}>
            <div className={style.icon}>
              <MdDateRange className={style.icon} />
            </div>
            <input
              type="date"
              name="expiry"
              id="expiry"
              placeholder="Enter Coupon Expiry"
              onChange={handleChange}
              value={coupon.expiry}
            />
          </div>
          {errors.expiry && (
            <span className={style.error}>{errors.expiry}</span>
          )}
        </div>

        <button className="add-btn" type="submit">
          Update Coupon
          <RxUpdate />
        </button>
        {errors.backEndError && (
          <span className={style.error}>{errors.backEndError}</span>
        )}
      </form>

      <ToastContainer />
    </div>
  );
}
