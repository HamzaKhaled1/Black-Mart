import Header from '../Header/Header';
import { useParams } from 'react-router-dom';
import Navbar from '../CategoryContent/Navbar';
import { useEffect, useState } from 'react';
import Signupoffer from '../Signupoffer/Signupoffer';
import Footer from '../Footer/Footer';
import { getAllProducts } from '../../../Helper/Apis/Shared/Product/getAllProducts';
import { getSpecificSubCategory } from '../../../Helper/Apis/Shared/SubCategory/getSpecificSubCategory';
import { getSpecificCategory } from '../../../Helper/Apis/Shared/Category/getSpecificCategory';
import ProductCard from '../Products/ProductCard';
import Loading from '../Loaders/Loading'; 
import OtherNavBar from "./OtherNavBar"
export default function SubCategoryContent({Flag}) {
  const { id } = useParams();
  const [Category, setCategory] = useState(null);
  const [products, setProducts] = useState([]);
  const [active, setActive] = useState(false);
  const [otherActive, setOtherActive] = useState(false);
  const [filters, setGetFilters] = useState({});
  const [filters2, setGetFilters2] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filteredProducts, setFilteredProducts] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true); 
        setError(null);
        const productsData = await getAllProducts();
        const filteredProducts = productsData.data.products.filter(
          (product) => product.subCategory._id === id
        );
        setProducts(filteredProducts);  
      } catch (error) {
        setError(error.message); 
      } finally {
        setLoading(false); 
      }
    };
    fetchData();
  }, [id]);
useEffect(() => {
  const fetchData = async () => {
    try {
      
      const subCategoryData = await getSpecificSubCategory(id);
      const categoryData = await getSpecificCategory(subCategoryData.subcategory.category);
      setCategory(categoryData.category);
    } catch (error) {

    } finally {
      setLoading(false); 
    }
  };
  fetchData();
}, [id]);

  useEffect(() => {
    localStorage.removeItem("filters")
  },[])
  useEffect(() => {
    if (products.length > 0) {
      let filtered = [...products];
      const localStorageFilters = JSON.parse(localStorage.getItem('filters')) || {};
      if (localStorageFilters.color) {
        filtered = filtered.filter(product => product.color.includes(localStorageFilters.color));
      }
      if (localStorageFilters.price) {
        if (localStorageFilters.price === "All Prices") {
          filtered = filtered
        }
        else{
        const prices = localStorageFilters.price.replace(/\$/g, "").split(" - ").map(price => price.trim());
        const low = Number(prices[0]);
        const high = Number(prices[1]);
        filtered = filtered.filter(product => product.price >= low && product.price <= high);
      }
    }
      if (localStorageFilters.type) {
        filtered = filtered.filter(product => product.typeof === localStorageFilters.type);
      }
      if(localStorageFilters.size){
        filtered = filtered.filter(product => product.size.includes(localStorageFilters.size))
      }
      if(localStorageFilters.style) {
        filtered = filtered.filter(product => product.style === localStorageFilters.style);
      }
      setFilteredProducts(filtered);
    }
  }, [products,filters]);
  if (loading) {
    return <Loading />;
  } 
  if (error) {
    return <div className="text-red-500 text-center">{error}</div>;
  }

  return (
    <> 
      <Signupoffer />
      <Header setActive={setActive}/>
      <div className='flex gap-10 p-6'>
        <Navbar setGetFilters={setGetFilters} active={active}  cat={Category}/> 
        <div className={`flex flex-col  w-screen ${active ? "hidden" : "flex"} `}>
          <div className='flex gap-4 justify-between p-3 w-full'>
            <p className='text-xl font-bold'>
              {filters.style }
            </p>
          </div>
          <div className='flex w-[21rem] justify-center sm:justify-normal sm:w-auto flex-wrap '>
            {filteredProducts.length > 0 ? (
              filteredProducts.map((item) => (
                <ProductCard
                  key={item._id}
                  name={item.name}
                  price={item.price}
                  image={item.imgCover}
                  id={item._id}
                />
              ))
            ) : (
              <p>No products available for this subcategory.</p>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
