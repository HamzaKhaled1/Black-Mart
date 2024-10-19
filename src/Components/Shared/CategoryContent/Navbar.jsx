import { GiSettingsKnobs } from "react-icons/gi";
import { IoIosArrowForward } from "react-icons/io";
import { useState, useEffect } from 'react';
import { IoIosArrowUp } from "react-icons/io";
import { FaCheck } from "react-icons/fa";
import { IoIosArrowDown } from "react-icons/io";


export default function Navbar({setGetFilters ,active,cat }) {
  const [isActive, setIsActive] = useState(false);
  const [selectedColor, setSelectedColor] = useState(null);
  const[open , setOpen] = useState(false)
  const[sizeopen , setSizeOpen] = useState(false)
  const[styleopen , setstyleOpen] = useState(false)
  const[priceopen,setPriceOpen] = useState(1000)
  const[priecactive,setpriceactive]=useState(false)
  const [name, setName] = useState("");
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
  useEffect(() => {
    if (cat && cat.name) {
      setName(cat.name);
    }
  }, [cat]);
  const colors = ["brown", "orange", "red", "blue", "white", "black", "green", "gray"];
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
  
  const handleClick = (size) => {
    setIsActive(size);
    setSelectedColor(size);
    setFilters((prevFilters) => ({
      ...prevFilters, 
      size:size
    }));
  };
  const handleColorClick = (color) => {
    setSelectedColor(color); 
    setFilters((prevFilters) => ({
      ...prevFilters, 
      color: color,   
    }));
    
  };
  const handleOpen = () => {
    setOpen(!open);
  }
  const handlesizeopen=()=>{
    setSizeOpen(!sizeopen)
  
  }
  const handlestyleopen=()=>{
    setstyleOpen(!styleopen)
  }
  
  useEffect(() => {
    localStorage.setItem('filters', JSON.stringify(filters));
    setGetFilters(filters);
  }, [filters, setGetFilters]);
  
  return (
    <div className={` w-full sm:w-96  sm:flex flex-col border border-slate-300 p-6 rounded-2xl ${active?"flex":"hidden"} `}>
      <div className="flex justify-between">
        <p className="font-extrabold">Filters</p>
        <GiSettingsKnobs className="text-xl cursor-pointer" />
      </div>
      <div className={`h-0.5 w-auto bg-black opacity-20  mt-4 mb-4 ${name=="Clothes"?"":"hidden"} `}></div>
      <div className={`${name=="Clothes"?"":"hidden"}`} >
        <ul className="flex flex-col gap-3 ">
          {["T-shirts", "Shorts", "Shirts", "Hoodie", "Jeans"].map((item, index) => (
            <li className="flex justify-between items-center py-2 cursor-pointer hover:bg-black hover:text-white rounded-md p-2 duration-150" 
            key={index}
            onClick={()=>handleFilters("type",item)}
            >
              {item}
              <IoIosArrowForward  className="text-xl opacity-70 cursor "/>
            </li>
          ))}
        </ul>
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
  <div className={`h-0.5 w-auto bg-black opacity-20  mt-4 mb-4 ${name=="Clothes"?"":"hidden"} `}></div>

    {/* colors part*/}
    <div className={`flex flex-col mt-5 gap-4 ${name=="Clothes"?"":"hidden"}`}   >
      <div className="flex justify-between">
      <p className="font-bold ">COLORS</p>
      {open ? <IoIosArrowUp className="opacity-70 cursor-pointer" onClick={handleOpen} /> : <IoIosArrowDown className="opacity-70 cursor-pointer" onClick={handleOpen} />}
      </div>
      <div className={open ? "flex flex-wrap gap-4  mt-4 " : " hidden"} >
      <div className="flex flex-wrap gap-4 mt-4">
  {colors.map((color,index) => (
    <div
      key={index}
      className="relative rounded-full bg-white border-2 border-slate-500 shadow-2xl h-10 w-10 cursor-pointer"
      style={{ backgroundColor: color }}
      onClick={() => handleColorClick(color)}
    >
      {selectedColor === color && (
        <FaCheck className="text-white absolute inset-0 m-auto flex justify-center items-center" />
      )}
    </div>
  ))}
</div>

    </div>
    <div className="h-0.5 w-auto bg-black opacity-20 mt-4 mb-4"></div>

    {/*size part */}
    <div className=" flex flex-col gap-4 " >
      <div className="flex justify-between">
      <p className="font-bold ">SIZE</p>
      {sizeopen? <IoIosArrowUp className="opacity-70 cursor-pointer" onClick={handlesizeopen} />:<IoIosArrowDown className="opacity-70 cursor-pointer" onClick={handlesizeopen} /> }
      
      </div>
      <div className={sizeopen? "flex flex-wrap gap-3":"hidden "}>
                {["XSmall","Small", "Medium", "Large", "XLarge","XXLarge"].map((size) => (
                  <div
                    key={size}
                    className={`rounded-full text-md min-w-28 h-10 flex items-center justify-center cursor-pointer hover:scale-105 ${
                      isActive === size
                        ? "bg-black text-white"
                        : "bg-slate-300 text-black"
                    }`}
                    onClick={() => handleClick(size)}
                  >
                    <span>{size}</span>
                  </div>
                ))}
              </div>
              </div>
        <div className="h-0.5 w-auto flex flex-col bg-black opacity-20 mt-4 mb-4"></div>

        {/* Style part */}
        <div className="flex flex-col gap-4">
        <div className="flex justify-between">
          <p className="font-bold ">Style</p> 
          {styleopen? <IoIosArrowUp className="opacity-70 cursor-pointer" onClick={handlestyleopen} /> : <IoIosArrowDown className="opacity-70 cursor-pointer" onClick={handlestyleopen} />}
          
        </div>
                <ul className={styleopen? "block":"hidden"}>
                  {["Casual", "Formal", "Semi-formal", "Streetwear"].map((item, index) => (
                    <li className="flex justify-between items-center py-2 cursor-pointer hover:bg-black hover:text-white rounded-md p-2 duration-150" 
                    key={index}
                    onClick={() => handleFilters("style",item)}
                    >
                      {item}
                      <IoIosArrowForward  className="text-xl opacity-70 "/>
                    </li>
                  ))}
                </ul>
                </div>

                <div className="bg-black text-white rounded-full mt-4 p-3 cursor-pointer text-center hover:bg-opacity-75">Apply Filter</div>
          
          
    </div>
     

    </div>
  );
}
