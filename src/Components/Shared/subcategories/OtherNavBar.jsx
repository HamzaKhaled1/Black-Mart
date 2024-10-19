import { GiSettingsKnobs } from "react-icons/gi";
import { IoIosArrowForward } from "react-icons/io";
import { useState, useEffect } from 'react';
import { IoIosArrowUp } from "react-icons/io";
import { FaCheck } from "react-icons/fa";
import { IoIosArrowDown } from "react-icons/io";


export default function Navbar({setGetFilters ,otherActive }) {
  const[sizeopen , setSizeOpen] = useState(false)
  const[priceopen,setPriceOpen] = useState(1000)
  const[priecactive,setpriceactive]=useState(false)
  const [filters, setFilters] = useState(() => {
    const storedFilters = localStorage.getItem('filters');
    return storedFilters ? JSON.parse(storedFilters) : {
      type: "",
      price: "$100 - $200",
      color: "",
      size: "Large",
      style: ""
    };
  });
 

  const handleFilters = (key, item) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      [key]: item, 
    }));
  };

  const handlePriceOpen = ()=> {
    setPriceOpen(!priceopen);
  };
  const priceactivehandler=(price)=>{
    setpriceactive(price)
  }
  
 
  useEffect(() => {
    localStorage.setItem('filters', JSON.stringify(filters));
    setGetFilters(filters);
  }, [filters, setGetFilters]);

  return (
    <div className={` w-full sm:w-96  sm:flex flex-col border border-slate-300 p-6 rounded-2xl ${otherActive?"flex":"hidden"} `}>
      <div className="flex justify-between">
        <p className="font-extrabold">Filters</p>
        <GiSettingsKnobs className="text-xl cursor-pointer" />
      </div>

     
      <div className="h-0.5 w-auto bg-black opacity-20 mt-4 mb-4"></div>
      {/*price part*/}
      <div className="flex flex-col mt-5 mb-5">
        <div className="flex justify-between">
          <p className="font-bold ">PRICE</p>
          {priceopen ? <IoIosArrowUp className="opacity-70 cursor-pointer" onClick={handlePriceOpen} /> : <IoIosArrowDown className="opacity-70 cursor-pointer" onClick={handlePriceOpen} />}
        </div>
        <ul className={priceopen ? "flex flex-col gap-2 mt-4" : "hidden"}>
  {["$100 - $200", "$200 - $300", "$300 - $400", "All Prices"].map((item, index) => (
    <li
      key={index}
      className={`py-2 cursor-pointer hover:bg-black hover:text-white rounded-md p-2 duration-150
        ${
          priecactive ===item
            ? "bg-black text-white"
            : "bg-slate-300 text-black"
        }
         `}


      onClick={()=>{handleFilters("price",item)
        priceactivehandler(item)
      }
        
      }
    >
      
      {item}
    </li>
  ))}
</ul>

      </div>
      <div className={sizeopen ? "flex gap-4 mt-4 " : "hidden"} >
    </div>
  <div className="h-0.5 w-auto bg-black opacity-20 mt-4 mb-4"></div>

     <div className="bg-black text-white rounded-full mt-4 p-3 cursor-pointer text-center hover:bg-opacity-75">Apply Filter</div>
          
          
    </div>
     

   
  );
}
