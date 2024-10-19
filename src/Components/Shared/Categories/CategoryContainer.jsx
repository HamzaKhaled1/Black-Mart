import { useState, useEffect } from "react";
import CategoryCard from "./CategoryCard";
import { getAllCategories } from "../../../Helper/Apis/Shared/Category/getAllCategories";
import style from "../../../assets/CSS/Shared/CategoriesContainer.module.css";
import Loading from "../Loaders/Loading";
import { Link } from "react-router-dom";
import { RiAddLargeLine } from "react-icons/ri";

export default function CategoryContainer() {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const getCategories = async () => {
      try {
        const categoriesData = await getAllCategories();
        setCategories(categoriesData.data.categories);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    getCategories();
  }, [categories]);
  

  return (
    <div className={style.Categories}>
      <div className="heading">
        <p className="title">Categories</p>
        <Link className="add-btn" to={`/admin/categories/add`}>
          {" "}
          Add Category
          <RiAddLargeLine />
        </Link>
      </div>
      {categories.length > 0 ? (
        <div className={style.categoriesCardsContainer}>
          {categories.map((category, index) => (
            <CategoryCard
              key={index}
              image={category.img}
              name={category.name}
              id={category._id}
            />
          ))}
        </div>
      ) : (
        <Loading />
      )}
    </div>
  );
}
