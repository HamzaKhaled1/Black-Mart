import { useState, useEffect } from "react";
import CategoryCard from "./categoryCard";
import { userCategories } from "../../Helper/Apis/Shared/Category/userCategories";
import Loading from "../Shared/Loaders/Loading";
import Header from "../Shared/Header/Header";
import Footer from "../Shared/Footer/Footer";
import Signupoffer from "../Shared/Signupoffer/Signupoffer";
import image from "../../../../Back/uploads/1729367536566_Clothes.jpg"
export default function UserCategoryContainer() {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const getCategories = async () => {
      try {
        const categoriesData = await userCategories(); 
        setCategories(categoriesData); 
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    getCategories();
  }, []); 
  
  console.log(categories)
    
  return (
    <div >
        <Signupoffer/>
        <Header/>
        <div className="p-10">
      <p className="text-3xl font-bold mb-5 underline underline-offset-8">Categories</p>
      {categories.length > 0 ? (
        <div className="flex flex-wrap gap-5 " >
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
      <Footer/>
    </div>
  );
}