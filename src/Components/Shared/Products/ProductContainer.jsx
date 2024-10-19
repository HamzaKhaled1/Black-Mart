import { useState, useEffect } from "react";
import { Link, useParams } from 'react-router-dom';
import Loading from "../Loaders/Loading";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import ProductPage from "./ProductPage";
import Signupoffer from "../Signupoffer/Signupoffer";
import { getSpecificProduct } from '../../../Helper/Apis/Shared/Product/getSpecificProducts';

export default function ProductContainer({setdata}) {
  const [product, setProduct] = useState(null); 
  const { id } = useParams(); 
  console.log(id)
  useEffect(() => {
    const getProduct = async () => {
      try {
        const productData = await getSpecificProduct(id); 
        setProduct(productData.data.product);
      } catch (error) {
        console.error("Error fetching product:", error);
      }
    };
    
    getProduct(); 
  }, [id]); 
  
  if (!product) {
    return <Loading />;
  }
  console.log(product.subCategory)
  return (
    <div>
      <Signupoffer />
      <Header />
      <div>
        <ProductPage
          productId={id}
          image={product.imgCover}
          sideimages={product.images}
          name={product.name}
          description={product.description}
          price={product.price}
          quantity={product.quantity}
          setdata={setdata}
          subCategory={product.subCategory}
        />
      </div>
      <Footer />
    </div>
  );
}
