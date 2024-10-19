/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { Link } from "react-router-dom";
import style from "../../assets/CSS/Admin/SubCategoriesCard.module.css";
import { deleteSubCategory } from "./../../Helper/Apis/Admin/SubCategory/deleteSub";
import Swal from "sweetalert2";
import { MdDelete } from "react-icons/md";
import { RxUpdate } from "react-icons/rx";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function SubCategoriesCard({ subCategory }) {
  console.log(subCategory);

  // Handle subcategory deletion with SweetAlert2 confirmation
  const handleDeleteSubCategory = async (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const response = await deleteSubCategory(id);
          console.log(response);

          // Show success alert
          // toast.success("Subcategory has been added successfully!", {
          //   position: "top-right",
          //   autoClose: 2000,
          //   hideProgressBar: false,
          //   closeOnClick: true,
          //   pauseOnHover: true,
          //   draggable: true,
          //   progress: undefined,
          //   theme: "colored",
          // });

          Swal.fire({
            title: "Subcategory deleted successfully!",
            icon: "success",
            showConfirmButton: false,
            timer: 2000,
          });

        } catch (error) {
          console.error("Error deleting subcategory:", error);

          // Show error alert
          Swal.fire(
            "Error!",
            "An error occurred while deleting the subcategory.",
            "error"
          );
        }
      }
    });
  };

  return (
    <>
      <div className={style.subCategoryCard}>
        <Link to={`/admin/subCategories`}>
          <img
            className={style.subCategoryImg}
            src={subCategory.img}
            alt={subCategory.name}
          />
          <p className={style.subCategoryName}>{subCategory.name}</p>
          <div className={style.subCategoryBtns}>
            <Link
              className={style.editBtn}
              to={`/admin/subCategories/edit/${subCategory._id}`}
            >
              Update
              <RxUpdate />
            </Link>
            <button
              className={style.deleteBtn}
              onClick={() => handleDeleteSubCategory(subCategory._id)}
            >
              Delete
              <MdDelete />
            </button>
          </div>
        </Link>
      </div>
      <ToastContainer />
    </>
  );
}
