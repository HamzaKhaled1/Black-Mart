import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { addProduct } from "../../Helper/Apis/Admin/Product/addProduct.js";
import { getAllCategories } from "../../Helper/Apis/Shared/Category/getAllCategories.js";
import { getAllSubCategories } from "../../Helper/Apis/Shared/SubCategory/getAllSub.js";
import style from "../../assets/CSS/Admin/AddCategoryForm.module.css";
import { SiNamecheap } from "react-icons/si";
import { MdOutlinePriceChange } from "react-icons/md";
import { MdLocalGroceryStore } from "react-icons/md";
import { TbCategoryFilled } from "react-icons/tb";
import { RiAddLine, RiFileCloudLine } from "react-icons/ri";
import { IoColorPalette } from "react-icons/io5";
import { SiZenn } from "react-icons/si";
import { RiDiscountPercentLine } from "react-icons/ri";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function AddProductForm() {
  const [categories, setCategories] = useState([]);
  const [subCategories, setSubCategories] = useState([]);
  const [errors, setErrors] = useState({
    name: "",
    description: "",
    price: "",
    quantity: "",
    brand: "",
    imgCover: null,
    images: "",
    category: "",
    subCategory: "",
    color: "",
    typeof: "",
    style: "",
    size: "",
    discount: "",
    backEndError: "",
  });
  const [product, setProduct] = useState({
    name: "",
    description: "",
    price: "",
    quantity: "",
    brand: "",
    imgCover: null,
    images: [],
    category: "",
    subCategory: "",
    color: [],
    size: [],
    typeof: "",
    style: "",
    discount: "",
  });
  const [previewImage, setPreviewImage] = useState(null);

  useEffect(() => {
    const getCategories = async () => {
      try {
        const response = await getAllCategories();
        setCategories(response.data.categories);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };
    getCategories();
  }, []);

  useEffect(() => {
    const getSubCategories = async () => {
      try {
        const response = await getAllSubCategories();
        setSubCategories(response);
      } catch (error) {
        console.error("Error fetching subcategories:", error);
      }
    };
    getSubCategories();
  }, []);

  const handleChange = (e) => {
    const { name, value, files } = e.target;

    if (name === "imgCover") {
      setProduct({
        ...product,
        imgCover: files[0],
      });
      setPreviewImage(URL.createObjectURL(files[0]));
    } else if (name === "color" || name === "size") {
      const values = Array.from(value.split(",")).map((color) => color.trim());
      setProduct({
        ...product,
        [name]: values,
      });
    } else if (name === "image1" || name === "image2") {
      const newImage = files[0];
      setProduct((product) => ({
        ...product,
        images: [...product.images, newImage],
      }));
    } else {
      setProduct({
        ...product,
        [name]: value,
      });
    }
  };

  useEffect(() => {
    console.log(product);
  }, [product]);

  const validateForm = () => {
    let formIsValid = true;
    let validationErrors = {};

    if (!product.name) {
      validationErrors.name = "Name is required";
      formIsValid = false;
    } else if (/^\d+$/.test(product.name)) {
      validationErrors.name = "Name cannot contain only numbers";
      formIsValid = false;
    }

    if (!product.description) {
      validationErrors.description = "Description is required";
      formIsValid = false;
    } else if (/^\d+$/.test(product.description)) {
      validationErrors.description = "Description cannot contain only numbers";
      formIsValid = false;
    }

    if (!product.brand) {
      validationErrors.brand = "Brand is required";
      formIsValid = false;
    }

    if (!product.price) {
      validationErrors.price = "Price is required";
      formIsValid = false;
    } else if (!/^\d+(\.\d{1,2})?$/.test(product.price)) {
      validationErrors.price = "Price must be a valid number";
      formIsValid = false;
    }

    if (!product.quantity) {
      validationErrors.quantity = "Quantity is required";
      formIsValid = false;
    } else if (!/^\d+$/.test(product.quantity)) {
      validationErrors.quantity = "Quantity must be a number";
      formIsValid = false;
    }

    if (!product.imgCover) {
      validationErrors.imgCover = "Image is required";
      formIsValid = false;
    } else if (!product.imgCover.name.match(/\.(jpg|jpeg|png|gif)$/)) {
      validationErrors.imgCover =
        "Please upload a valid image file (jpg, jpeg, png, gif)";
      formIsValid = false;
    }

    if (product.color.length === 0) {
      validationErrors.color = "Color is required";
      formIsValid = false;
    }

    if (product.size.length === 0) {
      validationErrors.size = "Size is required";
      formIsValid = false;
    }

    if (!product.category) {
      validationErrors.category = "Category is required";
      formIsValid = false;
    }

    if (!product.subCategory) {
      validationErrors.subCategory = "Subcategory is required";
      formIsValid = false;
    }

    if (!product.images || product.images.length === 0) {
      validationErrors.images = "Images are required";
      formIsValid = false;
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
      text: "Do you want to add this product?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "rgb(255, 198, 51)",
      cancelButtonColor: "rgb(255, 51, 51)",
      confirmButtonText: "Yes, add it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const formData = new FormData();
        formData.append("name", product.name);
        formData.append("description", product.description);
        formData.append("brand", product.brand);
        formData.append("quantity", product.quantity);
        formData.append("price", product.price);
        formData.append("category", product.category);
        formData.append("subCategory", product.subCategory);
        formData.append("imgCover", product.imgCover);
        if (product.discount !== "") {
          formData.append("discount", product.discount);
        }
        if (product.typeof !== "") {
          formData.append("typeof", product.typeof);
        }
        if (product.style !== "") {
          formData.append("style", product.style);
        }

        // Append multiple images
        product.images.forEach((image) => formData.append("images", image));

        // Append colors and sizes
        product.color.forEach((color) => formData.append("color[]", color));
        product.size.forEach((size) => formData.append("size[]", size));

        try {
          const response = await addProduct(formData);
          console.log(response);

          // If response is successful, use toast for success message
          if (response.status === 201 || response.status === 200) {
            toast.success("Product has been added successfully!", {
              position: "top-right",
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "colored",
            });

            // Reset form after successful submission
            setProduct({
              name: "",
              description: "",
              price: "",
              quantity: "",
              brand: "",
              imgCover: null,
              images: [],
              category: "",
              subCategory: "",
              color: [],
              size: [],
              style: "",
              typeof: "",
              discount: "",
            });
            setPreviewImage(null);
          }
        } catch (error) {
          // If an error occurs, use Swal to alert the user
          Swal.fire({
            title: "Error!",
            text:
              error.response?.data?.message ||
              "An error occurred while adding the product.",
            icon: "error",
            confirmButtonText: "OK",
            confirmButtonColor: "rgb(255, 198, 51)",
          }).then(() => {
            // Optionally reset the form in case of an error
            setProduct({
              name: "",
              description: "",
              price: "",
              quantity: "",
              brand: "",
              imgCover: null,
              images: [],
              category: "",
              subCategory: "",
              color: [],
              size: [],
              style: "",
              typeof: "",
              discount: "",
            });
            setPreviewImage(null);
          });

          console.error("Error adding product:", error);

          setErrors((prevErrors) => ({
            ...prevErrors,
            backEndError:
              error.response?.data?.message ||
              "An error occurred while adding the product.",
          }));
        }
      }
    });
  };

  return (
    <>
      <div className={style.formContainer}>
        <h2 className={`${style.formTitle}`}>Add Product Form</h2>
        <form onSubmit={handleSubmit}>
          <div className={style.inputContainer}>
            <label htmlFor="name">Name</label>
            <div className={style.inputField}>
              <div className={style.icon}>
                <SiNamecheap className={style.icon} />
              </div>
              <input
                type="text"
                name="name"
                id="name"
                placeholder="Enter Product Name"
                onChange={handleChange}
                value={product.name}
              />
            </div>
            {errors.name && <span className={style.error}>{errors.name}</span>}
          </div>
          <div className={style.inputContainer}>
            <label htmlFor="description">Description</label>
            <div className={style.inputField}>
              <div className={style.icon}>
                <SiNamecheap className={style.icon} />
              </div>
              <input
                type="text"
                name="description"
                id="description"
                placeholder="Enter Product Description"
                onChange={handleChange}
                value={product.description}
              />
            </div>

            {errors.description && (
              <span className={style.error}>{errors.description}</span>
            )}
          </div>
          <div className={style.inputContainer}>
            <label htmlFor="price">Price</label>
            <div className={style.inputField}>
              <div className={style.icon}>
                <MdOutlinePriceChange className={style.icon} />
              </div>
              <input
                type="text"
                name="price"
                id="price"
                placeholder="Enter Product Price"
                onChange={handleChange}
                value={product.price}
              />
            </div>
            {errors.price && (
              <span className={style.error}>{errors.price}</span>
            )}
          </div>
          <div className={style.inputContainer}>
            <label htmlFor="quantity">Quantity</label>
            <div className={style.inputField}>
              <div className={style.icon}>
                <MdLocalGroceryStore className={style.icon} />
              </div>
              <input
                type="text"
                name="quantity"
                id="quantity"
                placeholder="Enter Product Quantity"
                onChange={handleChange}
                value={product.quantity}
              />
            </div>
            {errors.quantity && (
              <span className={style.error}>{errors.quantity}</span>
            )}
          </div>
          <div className={style.inputContainer}>
            <label htmlFor="brand">Brand</label>
            <div className={style.inputField}>
              <div className={style.icon}>
                <SiNamecheap className={style.icon} />
              </div>
              <input
                type="text"
                name="brand"
                id="brand"
                placeholder="Enter Product Brand"
                onChange={handleChange}
                value={product.brand}
              />
            </div>
            {errors.brand && (
              <span className={style.error}>{errors.brand}</span>
            )}
          </div>

          <div className={style.inputContainer}>
            <label htmlFor="color">Colors</label>
            <p className={style.hint}>put (,) between colors</p>
            <div className={style.inputField}>
              <div className={style.icon}>
                <IoColorPalette className={style.icon} />
              </div>
              <input
                type="text"
                name="color"
                id="color"
                placeholder="Enter Product Colors"
                onChange={handleChange}
                value={product.color}
              />
            </div>
            {errors.color && (
              <span className={style.error}>{errors.color}</span>
            )}
          </div>

          <div className={style.inputContainer}>
            <label htmlFor="size">Size</label>
            <p className={style.hint}>put (,) between sizes</p>
            <div className={style.inputField}>
              <div className={style.icon}>
                <SiZenn className={style.icon} />
              </div>
              <input
                type="text"
                name="size"
                id="size"
                placeholder="Enter Product Size"
                onChange={handleChange}
                value={product.size}
              />
            </div>
            {errors.color && <span className={style.error}>{errors.size}</span>}
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
                value={product.category}
                className={style.selectInput}
              >
                <option value="">Select category</option>
                {categories.map((category) => (
                  <option key={category._id} value={category._id}>
                    {category.name}
                  </option>
                ))}
              </select>
            </div>

            {errors.category && (
              <span className={style.error}>{errors.category}</span>
            )}
          </div>

          <div className={style.inputContainer}>
            <label htmlFor="subCategory">SubCategory</label>
            <div className={style.inputField}>
              <div className={style.icon}>
                <SiNamecheap className={style.icon} />
              </div>
              <select
                name="subCategory"
                id="subCategory"
                onChange={handleChange}
                value={product.subCategory}
                className={style.selectInput}
              >
                <option value="">Select subcategory</option>
                {subCategories.map((subCategory) => (
                  <option key={subCategory._id} value={subCategory._id}>
                    {subCategory.name}
                  </option>
                ))}
              </select>
            </div>

            {errors.subCategory && (
              <span className={style.error}>{errors.subCategory}</span>
            )}
          </div>

          <div className={style.inputContainer}>
            <label className={style.customUpload} htmlFor="imgCover">
              <div className={style.icon}>
                <RiFileCloudLine className={style.imageIcon} />
              </div>
              <div className={style.text}>
                <p>Upload Cover Image</p>
              </div>
              <input
                className={style.fileInput}
                type="file"
                id="imgCover"
                name="imgCover"
                accept=".jpg,.jpeg,.png,.gif"
                onChange={handleChange}
              />
            </label>
            {errors.imgCover && (
              <span className={style.error}>{errors.imgCover}</span>
            )}
          </div>

          {previewImage && (
            <div className={style.previewImage}>
              <img
                src={previewImage}
                alt="Image Preview"
                className={style.imagePreview}
              />
            </div>
          )}

          {errors.imgCover && <span>{errors.imgCover}</span>}

          <div className={style.inputContainer}>
            <label className={style.customUpload} htmlFor="image1">
              <div className={style.icon}>
                <RiFileCloudLine className={style.imageIcon} />
              </div>
              <div className={style.text}>
                <p>Upload Image 1</p>
              </div>
              <input
                className={style.fileInput}
                type="file"
                id="image1"
                name="image1"
                accept=".jpg,.jpeg,.png,.gif"
                onChange={handleChange}
              />
            </label>
          </div>

          <div className={style.inputContainer}>
            <label className={style.customUpload} htmlFor="image2">
              <div className={style.icon}>
                <RiFileCloudLine className={style.imageIcon} />
              </div>
              <div className={style.text}>
                <p>Upload Image 2</p>
              </div>
              <input
                className={style.fileInput}
                type="file"
                id="image2"
                name="image2"
                accept=".jpg,.jpeg,.png,.gif"
                onChange={handleChange}
              />
            </label>
          </div>
          {errors.images && (
            <span className={style.error}>{errors.images}</span>
          )}

          <div className={style.inputContainer}>
            <label htmlFor="type">Type</label>
            <div className={style.inputField}>
              <div className={style.icon}>
                <SiNamecheap className={style.icon} />
              </div>
              <input
                type="text"
                name="typeof"
                id="typeof"
                placeholder="Enter type of product"
                onChange={handleChange}
                value={product.typeof}
              />
            </div>
            {errors.typeof && (
              <span className={style.error}>{errors.typeof}</span>
            )}
          </div>

          <div className={style.inputContainer}>
            <label htmlFor="style">Style</label>
            <div className={style.inputField}>
              <div className={style.icon}>
                <SiNamecheap className={style.icon} />
              </div>
              <input
                type="text"
                name="style"
                id="style"
                placeholder="Enter style of product"
                onChange={handleChange}
                value={product.style}
              />
            </div>

            {errors.style && (
              <span className={style.error}>{errors.style}</span>
            )}
          </div>

          <div className={style.inputContainer}>
            <label htmlFor="discount">Discount</label>
            <div className={style.inputField}>
              <div className={style.icon}>
                <RiDiscountPercentLine className={style.icon} />
              </div>
              <input
                type="text"
                name="discount"
                id="discount"
                placeholder="Enter discount of product"
                onChange={handleChange}
                value={product.discount}
              />
            </div>

            {errors.discount && (
              <span className={style.error}>{errors.discount}</span>
            )}
          </div>

          <button className="add-btn" type="submit">
            Add Product
            <RiAddLine />
          </button>
          {errors.backEndError && (
            <span className={style.error}>{errors.backEndError}</span>
          )}
        </form>

        <ToastContainer />
      </div>
    </>
  );
}
