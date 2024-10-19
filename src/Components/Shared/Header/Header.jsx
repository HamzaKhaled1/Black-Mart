import { IoSearchOutline } from "react-icons/io5";
import { FiShoppingCart } from "react-icons/fi";
import { CgProfile } from "react-icons/cg";
import { AiOutlineMenu } from "react-icons/ai";
import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { getAllCategories } from "../../../Helper/Apis/Shared/Category/getAllCategories";
import { getAllProducts } from "../../../Helper/Apis/Shared/Product/getAllProducts"; 
export default function Header({ setActive,setOtherActive,Flag }) {
  const [open, setOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredProducts, setFilteredProducts] = useState([]);
  const url=window.location.href
  useEffect(() => {
    const loginData = localStorage.getItem("loginData");
    setIsLoggedIn(!!loginData);

    getAllCategories()
      .then((response) => {
        setCategories(response.data || []);
      })
      .catch((error) => console.error("Error fetching categories:", error));

    getAllProducts()
      .then((response) => {
        setProducts(response.data.products || []);
      })
      .catch((error) => console.error("Error fetching products:", error));
  }, []);

  useEffect(() => {
    if (searchTerm) {
      const filtered = products.filter(product =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredProducts(filtered);
    } else {
      setFilteredProducts([]);
    }
  }, [searchTerm, products]);

  const [baractive, setBarActive] = useState(false);

  const handleactive = () => {
    setBarActive(!baractive);
    setActive(!baractive);
  };

  return (
    <div className={`flex flex-wrap  sm:flex-row sm:items-center  w-full  md:justify-between  p-1 `}>
      <div className={`flex  sm:flex-nowrap  sm:items-center w-3/4 sm:w-4/5  gap-4 mb-3 items-start p-3 `}>
      <div className="flex gap-2 items-center p-2">
        <AiOutlineMenu className="text-2xl block sm:hidden font-extrabold" onClick={handleactive} />
   
        <Link to={`/`}>
          <h1 className="text-3xl md:text-4xl font-extrabold cursor-pointer">BlackMart.</h1>
        </Link>
      </div>

      <div className=" felx mt-5   sm:mt-0 ">
        
        <Link to={`/Categories`}>
          <p className="text-md cursor-pointer">Categories</p>
        </Link>
        
        
      </div>

      <div className={`flex relative bg-transparent items-center sm:bg-gray-100 
        md:w-1/2 gap-5 md:flex rounded-full sm:items-center p-3 mt-4 md:mt-0 ${open ? "block" : "hidden"}`}>
  <IoSearchOutline className={`text-2xl sm:opacity-40 hidden sm:block`} />
  <input 
    type="text" 
    placeholder='Search for product ...' 
    value={searchTerm}
    onChange={(e) => setSearchTerm(e.target.value)}
    className={`bg-gray-200  rounded-xl   focus:outline-none p-2 sm:p-0 w-full sm:block ${open ? "block " : "hidden"}`}
  />
  {filteredProducts.length > 0 && (
    <div className="absolute top-full left-0 w-full mt-1 z-50 ">
      <ul className="bg-white flex flex-col items-start  border border-gray-200 rounded-md max-h-60 overflow-auto">
        {filteredProducts.map((product) => (
          <li key={product.id} className="p-2 hover:bg-gray-100  cursor-pointer ">
            <Link to={`/product/${product.id}`} className="flex items-center gap-3">
              <img 
                src={product.imgCover} 
                alt={product.name} 
                className="w-8 h-8 object-cover rounded-md"
              />
              {product.name}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )}
</div>
        
         </div>
        <div className="flex gap-3 md:mt-0  justify-center w-full  sm:w-auto ">
        <IoSearchOutline className={`text-xl block sm:hidden font-bold`} onClick={() => { setOpen(!open) }} />
        <Link to={`/Cart`}>
          <FiShoppingCart className="text-2xl md:text-3xl cursor-pointer" />
        </Link>
        <Link to={`/profile`}>
          <CgProfile className="text-2xl md:text-3xl cursor-pointer" />
        </Link>
        </div>
     
      
    </div>
  );
}
