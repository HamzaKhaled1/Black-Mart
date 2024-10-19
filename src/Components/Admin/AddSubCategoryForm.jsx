import { useState, useEffect } from "react";
import style from "../../assets/CSS/Admin/AddCategoryForm.module.css";
import { SiNamecheap } from "react-icons/si";
import Swal from "sweetalert2";
import { RiFileCloudLine } from "react-icons/ri";
import { addSubCategory } from "../../Helper/Apis/Admin/SubCategory/addSub";
import { getAllCategories } from "../../Helper/Apis/Shared/Category/getAllCategories";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { TbCategoryFilled } from "react-icons/tb";
export default function AddSubCategoryForm() {
  const [errors, setErrors] = useState({
    name: "",
    img: "",
    backEndError: "",
  });

  const [subCategory, setSubCategory] = useState({
    name: "",
    img: null,
    category: "",
  });

  const [categories, setCategories] = useState([]);
  const [previewImage, setPreviewImage] = useState(null);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const categoriesData = await getAllCategories();
        if (categoriesData) {
          setCategories(categoriesData.data.categories);
          
        }
      } catch (error) {
        console.error("Error fetching categories:", error);
        setErrors((prevErrors) => ({
          ...prevErrors,
          backEndError: "Failed to fetch categories.",
        }));
      }
    };
    fetchCategories();
  }, []);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "image") {
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
    console.log(subCategory);
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

    if (!subCategory.img) {
      validationErrors.img = "Image is required";
      formIsValid = false;
    } else if (!subCategory.img.name.match(/\.(jpg|jpeg|png|gif)$/)) {
      validationErrors.img =
        "Please upload a valid image file (jpg, jpeg, png, gif)";
      formIsValid = false;
    }

    if (!subCategory.category) {
      validationErrors.category = "Please select a category";
      formIsValid = false;
    }

    setErrors(validationErrors);
    return formIsValid;
  };

  // Function to reset form states
  const resetForm = () => {
    setSubCategory({
      name: "",
      img: null,
      category: "",
    });
    setPreviewImage(null);
    setErrors({
      name: "",
      img: "",
      category: "",
      backEndError: "",
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    Swal.fire({
      title: "Are you sure?",
      text: "Do you want to add this subcategory?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#299fff",
      cancelButtonColor: "rgb(255, 51, 51)",
      confirmButtonText: "Yes, add it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const formData = new FormData();
        formData.append("name", subCategory.name);
        formData.append("img", subCategory.img);
        formData.append("category", subCategory.category);

        try {
          const response = await addSubCategory(formData);
          console.log(response);

          toast.success("Subcategory has been added successfully!", {
            position: "top-right",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
          });

          resetForm(); // Reset form after successful submission
        } catch (error) {
          console.error("Error adding subcategory:", error);
          Swal.fire({
            title: "Error",
            text: "An error occurred while adding the subcategory.",
            icon: "error",
            confirmButtonText: "Try again",
            confirmButtonColor: "#299fff",
          }).then((result) => {
            if (result.isConfirmed) {
              resetForm(); // Reset form in case of an error
            }
          });

          setErrors((prevErrors) => ({
            ...prevErrors,
            backEndError: "An error occurred while adding the subcategory.",
          }));
        }
      }
    });
  };

  return (
    <div className={style.formContainer}>
      <h2 className={style.formTitle}>Add Subcategory Form</h2>
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
          <label htmlFor="category">Category</label>
          <div className={style.inputField}>
            <div className={style.icon}>
              <TbCategoryFilled className={style.icon} />
            </div>
            <select
              name="category"
              id="category"
              onChange={handleChange}
              value={subCategory.category}
              className={style.selectInput}
            >
              <option value="">Select Category</option>
              {categories
                ? categories.map((category) => (
                    <option key={category._id} value={category._id}>
                      {category.name}
                    </option>
                  ))
                : (console.log("categories:", categories),
                  (<option disabled>Loading categories...</option>))}
            </select>
          </div>

          {errors.category && (
            <span className={style.error}>{errors.category}</span>
          )}
        </div>

        <div className={style.inputContainer}>
          <label className={style.customUpload} htmlFor="file">
            <div className={style.icon}>
              <RiFileCloudLine className={style.imageIcon} />
            </div>
            <div className={style.text}>
              <p>Upload Image</p>
            </div>
            <input
              className={style.fileInput}
              type="file"
              id="file"
              name="image"
              onChange={handleChange}
            />
          </label>
          {errors.img && <span className={style.error}>{errors.img}</span>}
        </div>

        {previewImage && (
          <div className={style.previewImage}>
            <img src={previewImage} alt="Image Preview" />
          </div>
        )}

        <button className="add-btn" type="submit">
          Add Subcategory
        </button>
        {errors.backEndError && (
          <span className={style.error}>{errors.backEndError}</span>
        )}
      </form>

      <ToastContainer />
    </div>
  );
}
