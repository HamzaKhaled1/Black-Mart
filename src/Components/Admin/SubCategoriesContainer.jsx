import { useEffect, useState } from "react";
import { getAllSubCategories } from "../../Helper/Apis/Shared/subCategory/getAllSub";
import SubCategoriesCard from "./SubCategoriesCard";
import { Link } from "react-router-dom";
import { RiAddLine } from "react-icons/ri";

import style from "../../assets/CSS/Admin/SubCategoriesContainer.module.css";

export default function SubCategoriesContainer() {
  const [subCategories, setSubCategories] = useState([]);

  useEffect(() => {
    const getSubCategories = async () => {
      let subCategoriesData = await getAllSubCategories();
      setSubCategories(subCategoriesData);
    };
    getSubCategories();
  }, [subCategories]);
  return (
    <div className="p-3">
      <div className="heading">
        <p className="title">Sub Categories</p>
        <Link className="add-btn" to={`/admin/subCategories/add`}>
          Add Sub Category
          <RiAddLine />
        </Link>
      </div>

      {subCategories.length > 0 ? (
        <div className={style.subCategoriesCardsContainer}>
          {subCategories.map((subCategory) => (
            <SubCategoriesCard key={subCategory.id} subCategory={subCategory} />
          ))}
        </div>
      ) : (
        <p>No sub categories found</p>
      )}
    </div>
  );
}
