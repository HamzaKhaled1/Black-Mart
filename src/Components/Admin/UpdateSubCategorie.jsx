import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getAllCategories } from "../../Helper/Apis/Shared/Category/getAllCategories";
import style from "../../assets/CSS/Admin/AddCategoryForm.module.css";
import { SiNamecheap } from "react-icons/si";
import Swal from "sweetalert2";
import { RiFileCloudLine } from "react-icons/ri";
import { updateSubCategory } from "../../Helper/Apis/Admin/SubCategory/updateSub";
import { getSpecificSubCategory } from "../../Helper/Apis/Shared/SubCategory/getSpecificSubCategory";
import { RxUpdate } from "react-icons/rx";
import { TbCategoryFilled } from "react-icons/tb";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "react-toastify/dist/ReactToastify.css";

export default function UpdateSubCategoryForm() {
  const { id } = useParams();

  const [errors, setErrors] = useState({
    name: "",
    img: "",
    category: "",
    backEndError: "",
  });

  const [categories, setCategories] = useState([]);
  const [subCategory, setSubCategory] = useState({
    name: "",
    img: null,
    parentCategory: "",
  });

  const [previewImage, setPreviewImage] = useState(null);

  // Fetch categories and subcategory data on mount
  useEffect(() => {
    const fetchData = async () => {
      try {
        const categoriesData = await getAllCategories();
        // if (categoriesData) {
        //   console.log("Fetching categories data:", categoriesData);
        // }
        setCategories(categoriesData.data.categories);

        const subCategoryData = await getSpecificSubCategory(id);
        console.log(subCategoryData.subcategory);

        if (subCategoryData.subcategory) {
          setSubCategory({
            name: subCategoryData.subcategory.name || "",
            img: subCategoryData.subcategory.img || null,
            parentCategory: subCategoryData.subcategory.category || "",
          });
          setPreviewImage(subCategoryData.subcategory.img);
        } else {
          setErrors((prevErrors) => ({
            ...prevErrors,
            backEndError: "Failed to load subcategory data",
          }));
        }
      } catch (error) {
        console.error("Error fetching data:", error);
        setErrors((prevErrors) => ({
          ...prevErrors,
          backEndError: "An error occurred while fetching data.",
        }));
      }
    };

    fetchData();
  }, [id]);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "img") {
      const file = files[0];
      setSubCategory({
        ...subCategory,
        img: file,
      });
      setPreviewImage(URL.createObjectURL(file));
    } else {
      setSubCategory({
        ...subCategory,
        [name]: value,
      });
    }
  };

  const validateForm = () => {
    let formIsValid = true;
    let validationErrors = {};

    if (!subCategory.name) {
      validationErrors.name = "Name is required";
      formIsValid = false;
    } else if (/^\d+$/.test(subCategory.name)) {
      validationErrors.name = "Name cannot contain only numbers";
      formIsValid = false;
    }

    if (!subCategory.parentCategory) {
      validationErrors.category = "Parent category is required";
      formIsValid = false;
    }

    if (subCategory.img && typeof subCategory.img === "object") {
      if (!subCategory.img.name.match(/\.(jpg|jpeg|png|gif)$/)) {
        validationErrors.img =
          "Please upload a valid image file (jpg, jpeg, png, gif)";
        formIsValid = false;
      }
    }

    setErrors(validationErrors);
    return formIsValid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    Swal.fire({
      title: "Are you sure?",
      text: "Do you want to update this subcategory?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "rgb(255, 198, 51)",
      cancelButtonColor: "rgb(255, 51, 51)",
      confirmButtonText: "Yes, update it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const formData = new FormData();
        formData.append("name", subCategory.name);
        formData.append("category", subCategory.parentCategory);
        if (subCategory.img && typeof subCategory.img === "object") {
          formData.append("img", subCategory.img);
        }

        try {
          const response = await updateSubCategory(id, formData);
          console.log(response);

          // Swal.fire({
          //   title: "Updated!",
          //   text: "Subcategory has been updated successfully.",
          //   icon: "success",
          //   confirmButtonText: "OK",
          //   confirmButtonColor: "rgb(255, 198, 51)",
          // });

          toast.success("Subcategory has been updated successfully!", {
            position: "top-right",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
          });

          setPreviewImage(null);
        } catch (error) {
          console.error("Error updating subcategory:", error);
          setErrors((prevErrors) => ({
            ...prevErrors,
            backEndError: "An error occurred while updating the subcategory.",
          }));
        }
      }
    });
  };

  return (
    <div className={style.formContainer}>
      <h2 className={style.formTitle}>Update SubCategory Form</h2>
      <form onSubmit={handleSubmit}>
        <div className={style.inputContainer}>
          <label htmlFor="name">Subcategory Name</label>
          <div className={style.inputField}>
            <div className={style.icon}>
              <SiNamecheap />
            </div>
            <input
              type="text"
              name="name"
              id="name"
              placeholder="Enter Subcategory Name"
              onChange={handleChange}
              value={subCategory.name}
            />
          </div>
          {errors.name && <span className={style.error}>{errors.name}</span>}
        </div>

        <div className={style.inputContainer}>
          <label htmlFor="parentCategory">Category</label>
          <div className={style.inputField}>
            <div className={style.icon}>
              <TbCategoryFilled className={style.icon} />
            </div>
            <select
              name="parentCategory"
              id="parentCategory"
              onChange={handleChange}
              value={subCategory.parentCategory}
              className={style.selectInput}
            >
              <option value="">Select Category</option>
              {categories ? (
                categories.map((category) => (
                  <option key={category._id} value={category._id}>
                    {category.name}
                  </option>
                ))
              ) : (
                <option value="" disabled>
                  Loading...
                </option>
              )}
            </select>
          </div>
          {errors.category && (
            <span className={style.error}>{errors.category}</span>
          )}
        </div>

        <div className={style.inputContainer}>
          <label className={style.customUpload} htmlFor="img">
            <div className={style.icon}>
              <RiFileCloudLine className={style.imageIcon} />
            </div>
            <div className={style.text}>
              <p>Upload New Image</p>
            </div>
            <input
              className={style.fileInput}
              type="file"
              id="img"
              name="img"
              onChange={handleChange}
            />
          </label>
          {errors.img && <span className={style.error}>{errors.img}</span>}
        </div>

        {previewImage && (
          <div className={style.previewImage}>
            <img src={previewImage || "/no-image.png"} alt="Image Preview" />
          </div>
        )}

        <button className="add-btn mt-2" type="submit">
          Update Subcategory
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
