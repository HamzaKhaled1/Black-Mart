/* eslint-disable react/prop-types */
import { Link } from "react-router-dom";
import style from "../../../assets/CSS/Shared/CategoryCard.module.css";
import { deleteCategory } from "../../../Helper/Apis/Admin/Category/deleteCategory";
import Swal from "sweetalert2";
import { GrUpdate } from "react-icons/gr";
import { MdDelete } from "react-icons/md";
import { ToastContainer, toast } from "react-toastify"; 
import "react-toastify/dist/ReactToastify.css"; 

export default function CategoryCard({ image, name, id }) {
  const handleUpdate = () => {};

  const handleDelete = () => {
    Swal.fire({
      title: "Are you sure?",
      text: `Do you really want to delete the category "${name}"? This action cannot be undone!`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#299fff",
      cancelButtonColor: "rgb(255, 51, 51)",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          console.log("Initiating delete for category ID:", id); 

          const deleteCategoryResponse = await deleteCategory(id);
          console.log("API response:", deleteCategoryResponse);

          if (deleteCategoryResponse) {
            // toast.success("Category has been added successfully!", {
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
              title: "Category deleted successfully!",
              icon: "success",
              showConfirmButton: false,
              timer: 2000,
            });

          } else {
            throw new Error("Deletion failed: No response from API.");
          }
        } catch (error) {
          console.error("Error during category deletion:", error);
          toast.error("Failed to delete category.", {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
          });
        }
      }
    });
  };

  return (
    <div className={style.categoryCard}>
      <img className={style.image} src={image} alt={name} />
      <p className={style.name}>{name}</p>
      <div className={style.buttonsContainer}>
        <button
          className={`${style.button} ${style.updateButton}`}
          onClick={handleUpdate}
        >
          <Link to={`/admin/update-category/${id}`}>
            Update
            <GrUpdate />
          </Link>
        </button>
        <button
          className={`${style.button} ${style.deleteButton}`}
          onClick={handleDelete}
        >
          Delete
          <MdDelete />
        </button>
      </div>

      <ToastContainer />
    </div>
  );
}
