import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { updateProduct } from "../../Helper/Apis/Admin/Product/updateProduct.js"; // Update product API
import { getAllCategories } from "../../Helper/Apis/Shared/Category/getAllCategories.js";

import style from "../../assets/CSS/Admin/AddCategoryForm.module.css";
import { SiNamecheap } from "react-icons/si";
import { MdOutlinePriceChange } from "react-icons/md";
import { MdLocalGroceryStore } from "react-icons/md";
import { TbCategoryFilled } from "react-icons/tb";
import { RiFileCloudLine } from "react-icons/ri";
import { useParams } from "react-router-dom";
import { getSpecificProduct } from "../../Helper/Apis/Shared/Product/getSpecificProducts.js";
import { getAllSubCategories } from "../../Helper/Apis/Shared/SubCategory/getAllSub.js";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { RxUpdate } from "react-icons/rx";

export default function UpdateProductForm() {
  const [categories, setCategories] = useState([]);
  const [subCategories, setSubCategories] = useState([]);
  const { id } = useParams(); // Get the product ID from the URL
  const [errors, setErrors] = useState({
    name: "",
    description: "",
    price: "",
    quantity: "",
    brand: "",
    imgCover: null,
    images: "",
    category: "",
    subcategory: "",
    typeof: "",
    color: "",
    style: "",
    size: "",
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
    subcategory: "",
    typeof: "",
    color: [],
    size: [],
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
    const getSubCategories = async () => {
      try {
        const response = await getAllSubCategories();
        setSubCategories(response);
      } catch (error) {
        console.error("Error fetching subcategories:", error);
      }
    };
    getCategories();
    getSubCategories();
  }, []);

  // Fetch product data to populate the form
  useEffect(() => {
    const getProductData = async () => {
      try {
        const response = await getSpecificProduct(id);
        const productData = response.data.product;
        setProduct({
          name: productData.name,
          description: productData.description,
          price: productData.price,
          quantity: productData.quantity,
          brand: productData.brand,
          imgCover: productData.imgCover,
          images: productData.images,
          category: productData.category,
          subcategory: productData.subCategory,
          typeof: productData.typeof,
          color: productData.color,
          size: productData.size,
          style: productData.style,
          discount: productData.discount,
        });
        setPreviewImage(productData.imgCover);
        console.log(productData);
      } catch (error) {
        console.error("Error fetching product data:", error);
      }
    };
    getProductData();
  }, [id]);

  // Handle input change and image upload
  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "imgCover") {
      setProduct({
        ...product,
        imgCover: files[0],
      });
      console.log(product);
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

  const validateForm = () => {
    let formIsValid = true;
    let validationErrors = {};
    // Name validation
    if (!product.name) {
      validationErrors.name = "Name is required";
      formIsValid = false;
    } else if (/^\d+$/.test(product.name)) {
      validationErrors.name = "Name cannot contain only numbers";
      formIsValid = false;
    }
    // Description validation
    if (!product.description) {
      validationErrors.description = "Description is required";
      formIsValid = false;
    } else if (/^\d+$/.test(product.description)) {
      validationErrors.description = "Description cannot contain only numbers";
      formIsValid = false;
    }

    // Brand validation
    if (!product.brand) {
      validationErrors.brand = "Brand is required";
      formIsValid = false;
    }
    // Price validation
    if (!product.price) {
      validationErrors.price = "Price is required";
      formIsValid = false;
    } else if (!/^\d+(\.\d{1,2})?$/.test(product.price)) {
      validationErrors.price = "Price must be a valid number";
      formIsValid = false;
    }
    // Quantity validation
    if (!product.quantity) {
      validationErrors.quantity = "Quantity is required";
      formIsValid = false;
    } else if (!/^\d+$/.test(product.quantity)) {
      validationErrors.quantity = "Quantity must be a number";
      formIsValid = false;
    }
    // Image validation
    if (!product.imgCover) {
      validationErrors.imgCover = "Image is required";
      formIsValid = false;
    } else if (!product.imgCover.name?.match(/\.(jpg|jpeg|png|gif)$/)) {
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

    if (!product.subcategory) {
      validationErrors.subcategory = "Subcategory is required";
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
      text: "Do you want to update this product?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "rgb(255, 198, 51)",
      cancelButtonColor: "rgb(255, 51, 51)",
      confirmButtonText: "Yes, update it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const formData = new FormData();
        formData.append("name", product.name);
        formData.append("description", product.description);
        formData.append("brand", product.brand);
        formData.append("quantity", product.quantity);
        formData.append("price", product.price);
        formData.append("category", product.category);
        formData.append("subcategory", product.subcategory);
        if (product.imgCover instanceof File) {
          formData.append("imgCover", product.imgCover);
        }
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
        // product.images.forEach((image) => formData.append("images", image));

        product.color.forEach((color) => formData.append("color[]", color));
        product.size.forEach((size) => formData.append("size[]", size));

        try {
          const response = await updateProduct(id, formData);
          console.log(response);

          toast.success("Product has been updated successfully.", {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
          });

          // Reset the form and preview
          setProduct({
            name: "",
            description: "",
            price: "",
            quantity: "",
            brand: "",
            imgCover: null,
            images: [],
            category: "",
            subcategory: "",
            typeof: "",
            color: "",
            size: "",
            style: "",
            discount: "",
          });
          setPreviewImage(null);
        } catch (error) {
          console.error("Error updating product:", error);
          setErrors((prevErrors) => ({
            ...prevErrors,
            backEndError: "An error occurred while updating the product.",
          }));
        }
      }
    });
  };

  return (
    <>
      <div className={style.formContainer}>
        <h2 className={`${style.formTitle}`}>Update Product Form</h2>
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
            <label htmlFor="brand">Colors</label>
            <p className={style.hint}>put (,) between sizes</p>
            <div className={style.inputField}>
              <div className={style.icon}>
                <SiNamecheap className={style.icon} />
              </div>
              <input
                type="text"
                name="color"
                id="color"
                placeholder="Enter Product Color"
                onChange={handleChange}
                value={product.color}
              />
            </div>
            {errors.brand && (
              <span className={style.error}>{errors.color}</span>
            )}
          </div>

          <div className={style.inputContainer}>
            <label htmlFor="brand">Size</label>
            <p className={style.hint}>put (,) between sizes</p>
            <div className={style.inputField}>
              <div className={style.icon}>
                <SiNamecheap className={style.icon} />
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
            {errors.brand && <span className={style.error}>{errors.size}</span>}
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
                <option value="">Select Category</option>
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
            <label htmlFor="subcategory">Subcategory</label>
            <div className={style.inputField}>
              <div className={style.icon}>
                <TbCategoryFilled className={style.icon} />
              </div>
              <select
                name="subcategory"
                id="subcategory"
                onChange={handleChange}
                value={product.subcategory}
                className={style.selectInput}
              >
                <option value="">Select Subcategory</option>
                {subCategories.map((sub) => (
                  <option key={sub._id} value={sub._id}>
                    {sub.name}
                  </option>
                ))}
              </select>
            </div>
            {errors.subcategory && (
              <span className={style.error}>{errors.subcategory}</span>
            )}
          </div>

          <div className={style.inputContainer}>
            <label htmlFor="brand">Type</label>
            <div className={style.inputField}>
              <div className={style.icon}>
                <SiNamecheap className={style.icon} />
              </div>
              <input
                type="text"
                name="typeof"
                id="type"
                placeholder="Enter Product Type"
                onChange={handleChange}
                value={product.typeof}
              />
            </div>
            {errors.brand && (
              <span className={style.error}>{errors.typeof}</span>
            )}
          </div>

          <div className={style.inputContainer}>
            <label htmlFor="brand">Style</label>
            <div className={style.inputField}>
              <div className={style.icon}>
                <SiNamecheap className={style.icon} />
              </div>
              <input
                type="text"
                name="style"
                id="style"
                placeholder="Enter Product Style"
                onChange={handleChange}
                value={product.style}
              />
            </div>
            {errors.brand && (
              <span className={style.error}>{errors.style}</span>
            )}
          </div>

          <div className={style.inputContainer}>
            <label htmlFor="imgCover">Image</label>
            <div className={style.inputField}>
              <div className={style.icon}>
                <RiFileCloudLine className={style.icon} />
              </div>
              <input
                type="file"
                name="imgCover"
                id="imgCover"
                onChange={handleChange}
              />
            </div>
            {errors.imgCover && (
              <span className={style.error}>{errors.imgCover}</span>
            )}
          </div>

          {previewImage && (
            <div className={style.previewImage}>
              <img
                src={previewImage}
                alt="Preview"
                className={style.imagePreview}
              />
            </div>
          )}

          {errors.backEndError && (
            <span className={style.error}>{errors.backEndError}</span>
          )}
          <button type="submit" className="add-btn">
            Update Product
            <RxUpdate />
          </button>
        </form>

        <ToastContainer />
      </div>
    </>
  );
}
