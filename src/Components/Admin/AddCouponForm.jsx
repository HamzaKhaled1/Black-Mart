/* eslint-disable no-unused-vars */
import { useState } from "react";
import style from "../../assets/CSS/Admin/AddCategoryForm.module.css";
import { addCoupon } from "../../Helper/Apis/Admin/Coupons/addCoupon";
import Swal from "sweetalert2";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FaBarcode } from "react-icons/fa";
import { BsPatchMinus } from "react-icons/bs";
import { MdDateRange } from "react-icons/md";
import { RiAddLine } from "react-icons/ri";

export default function AddCouponForm() {
  const [coupon, setCoupon] = useState({
    code: "",
    discount: "",
    expiry: "",
  });

  const [errors, setErrors] = useState({
    code: "",
    discount: "",
    expiry: "",
    backEndError: "",
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setCoupon({
      ...coupon,
      [name]: value,
    });
  };

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

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validForm()) {
      return;
    }

    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, add it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const formData = new FormData();
        formData.append("code", coupon.code);
        formData.append("discount", parseInt(coupon.discount));
        formData.append("expiry", coupon.expiry.replace(/-/g, "/"));

        try {
          const response = await addCoupon(formData);

          console.log("response", response);

          toast.success("Coupon has been added successfully!", {
            position: "top-right",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
          });

          setCoupon({
            code: "",
            discount: "",
            expiry: "",
          });
        } catch (error) {
          console.log(error);
          Swal.fire({
            title: "Error!",
            text:
              error.response?.data?.message ||
              "An error occurred while adding the coupon.",
            icon: "error",
            confirmButtonText: "OK",
            confirmButtonColor: "#3085d6",
          });

          setErrors((prevErrors) => ({
            ...prevErrors,
            backEndError: error.message,
          }));
        }
      }
    });
  };

  return (
    <div className={style.formContainer}>
      <h2 className={`${style.formTitle}`}>Add Coupon Form</h2>
      <form className={style.form} onSubmit={handleSubmit}>
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
              placeholder="Enter Coupon Code"
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
              placeholder="Enter Coupon Expiry Date"
              onChange={handleChange}
              value={coupon.expiry}
            />
          </div>

          {errors.expiry && (
            <span className={style.error}>{errors.expiry}</span>
          )}
        </div>

        <button className="add-btn" type="submit">
          Add Coupon
          <RiAddLine />
        </button>
        {errors.backEndError && (
          <span className={style.error}>{errors.backEndError}</span>
        )}
      </form>

      <ToastContainer />
    </div>
  );
}
