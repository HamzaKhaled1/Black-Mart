import {useRef ,useState,useEffect } from 'react'
import {getAllProducts} from '../../../../Helper/Apis/Shared/Product/getAllProducts'
import ProductCard from '../../Products/ProductCard'
import { Link } from 'react-router-dom'
export default function Topselling() {
  const containerRef=useRef(null)
  const [products,setProducts]=useState([])
  useEffect(() => {
    const getProducts = async () => {
      let ProductsData = await getAllProducts();
      setProducts(ProductsData.data.products.slice(1));

    };
  getProducts();
    }, [])
    const scrollLeft = () => {
      if (containerRef.current) {
        containerRef.current.scrollBy({
          left: -300, 
          behavior: 'smooth',
        });
      }
    };
    const scrollRight = () => {
      containerRef.current.scrollBy({ left: 200, behavior: "smooth" });
    };
    return (<>
     <p className="text-3xl font-extrabold text-center w-full mt-5 sm:mb-10">
        TOP SELLING
      </p>
      <div className="relative ">
      <button
        onClick={scrollLeft}
        className={`absolute left-0 top-1/2 z-50  transform -translate-y-1/2 bg-gray-300 p-2 rounded-full ${products.length > 6 ? "block":"hidden" }`}
      >
        ◀
      </button>
      
      <div ref={containerRef} className="flex overflow-x-auto w-full no-scrollbar" >
        <div className="flex gap-2 pointer-events-auto justify-start w-full items-center">
        {products.map((item) => (
          <div key={item._id} onClick={() => navigate(`/product/${item._id}`)}>
            <ProductCard
              name={item.name}
              price={item.price}
              image={item.imgCover}
              id={item._id}
              quantity={1}
            />
          </div>
        ))}
        </div>
      </div>
      
      <button
        onClick={scrollRight}
        className={`absolute right-0 top-1/2 z-50  transform -translate-y-1/2 bg-gray-300 p-2 rounded-full ${products.length > 6 ? "block":"hidden" }`}
      >
        ▶
      </button>
    </div>
  </>
    )
  }
  