import { useEffect, useState } from "react";
import { getAllProducts } from "../../Helper/Apis/Shared/Product/getAllProducts";
import ProductCard from "./ProductCard";
import { Link } from "react-router-dom";
import style from "../../assets/CSS/Admin/ProductsContainer.module.css";
import { RiAddLine } from "react-icons/ri";

export default function ProductsContainer() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const getProducts = async () => {
      let ProductsData = await getAllProducts();
      setProducts(ProductsData.data.products);
    };
    getProducts();
  }, [products]);
  return (
    <div className=" p-3 ">
      <div className="heading">
        <p className="title">Products</p>
        <Link className="add-btn" to={`/admin/products/add`}>
          Add Product
          <RiAddLine />
        </Link>
      </div>
      <div className={style.ProductsContainer}>
        {products.map((product) => (
          <ProductCard key={product._id} product={product} />
        ))}
      </div>
    </div>
  );
}
