/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
/* eslint-disable react/no-unescaped-entities */
import { MdDelete } from "react-icons/md";
import { useRef, useEffect, useState } from "react";
import { FaPlus } from "react-icons/fa";
import { FaMinus } from "react-icons/fa";
import { GiSettingsKnobs } from "react-icons/gi";
import ProductCard from "./ProductCard";
import { FaCheck } from "react-icons/fa";
import DeleteReview from "../../../Helper/Apis/Shared/Reviews/DeleteReview";
import Swll from "sweetalert2";
import GetAllReviews from "../../../Helper/Apis/Shared/Reviews/GetAllReviews";
import AddReview from "../../../Helper/Apis/Shared/Reviews/AddReview";
import Swal from "sweetalert2";
import { getAllProducts } from "../../../Helper/Apis/Shared/Product/getAllProducts";
import AddtoCart from "../../../Helper/Apis/User/CartAPis/AddtoCart";
import { Link,useNavigate } from "react-router-dom";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
export default function ProductPage({
  productId,
  image,
  name,
  sideimages,
  description,
  price,
  setdata,
  subCategory
}){
  const navigate = useNavigate();
  const [Cart,setCart]=useState({})
  const [products, setProducts] = useState([]);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const[change,setChange]=useState(false)
  const [reviews,setReviews]=useState([])
  const [counter, setcounter] = useState(0);
  const [isActive, setIsActive] = useState(false);
  const [img, setImage] = useState(image);
  const [selectedColor, setSelectedColor] = useState(null);
  const loginData = localStorage.getItem("loginData");
  const containerRef = useRef(null);
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
  let localdata = null;
  if (loginData) {
    try {
      localdata = JSON.parse(loginData);
     
    } catch (error) {
      console.error("Error parsing login data:", error);
    }
  }
  
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const products = await getAllProducts();
        setProducts(products.data.products);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    }
    fetchProducts()
  },[])
  const id = localdata ? localdata[0]?.Payload?.userId : null;
  const [data,setData]=useState({
    name:name,
    color:"",
    size:"",
    quantity:0,
  })
  const deletehandler = async (id) => {
    try {
        const result = await Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            cancelButtonColor: '#3085d6',
            confirmButtonText: 'Yes, delete it!',
        });

        if (result.isConfirmed) {
            const response = await DeleteReview(id);
            if (response.status === 200) {
                await Swal.fire(
                    'Deleted!',
                    'Your review has been deleted.',
                    'success'
                );
                setChange(!change);
              }
            }
            setIsPopupOpen(false)
    } catch (error) {
        console.error("Error deleting review:", error);
        await Swal.fire(
            'Error!',
            'There was a problem deleting your review.',
            'error'
        );
    }
};
  const [reviewToSent,setReviewToSent]=useState({
    review:"",
    rating:"",
    product:productId
  })
const reviewchangeHandler=(e)=>{
  setReviewToSent((prevData)=>{
    return {
      ...prevData,
      review:e.target.value
    }
  })

}
const ratechangeHandler=(e)=>{
  setReviewToSent((prevData)=>{
    return {
      ...prevData,
      rating:e.target.value
    }
  })
}


  const handlePopupOpen = () => {
    setIsPopupOpen(!isPopupOpen);
  };

  const handlePopupClose = () => {
    setIsPopupOpen(!isPopupOpen);
  };
  const sentReviewHandler = async () => {
    try {
      const response = await AddReview(reviewToSent);
      toast.success('Review posted successfully', { position:"top-right" });
      setChange(!change);
    } catch (error) {
      console.error("Error posting review:", error);
      toast.error('You already submitted a review', { position: "top-right" });
    }
  };
  
 
  const handelimg = (e) => {
    setImage(e.target.src);
  };
  const handleClick = (size) => {
    setIsActive(size);
  };
  const handleColorClick = (color) => {
    setSelectedColor(color);
  };
  
  const datahandler = (key, item) => {
    setData((prevData) => ({
      ...prevData,
      [key]: item,
    }));
    
  };

  
  useEffect(()=>{
    setCart({
      product:productId,
      data:data
    })
  },[data])
  const sendDataHandler = async () => {
    try {
      if (productId) {
        await AddtoCart(Cart);
        toast.success('Product added to cart', { position: "top-right"});
      } else {
        toast.error('Product ID is missing or invalid', { position: "top-right" });
      }
    } catch (error) {
      console.error("Error adding product to cart:", error);
      toast.error('Failed to add product to cart', { position:"top-right" });
    }
  };
  useEffect(() => {

    const fetchReviews = async () => {
      const fetchedReviews = await GetAllReviews();
      const filteredReviews = fetchedReviews.filter((review) => review.product === productId);
      if (filteredReviews) {
        setReviews(filteredReviews);
        
      }
    };
    fetchReviews(); 
  }, [change]);
  return (<>
    <div className="flex flex-col sm:gap-5 justify-center ">
      <div className="sm:flex sm:p-6 sm:gap-7 justify-around  ">
        {/*display images part */}
        <div className="items-center flex flex-col sm:flex-row-reverse  gap-5    ">
          <img
            src={img}
            alt={name}
            className=" rounded-3xl min-w-80  w-[12rem] sm:w-[30rem] sm:h-[30rem] "
          />
          {/* <div className="flex sm:flex-col  gap-10">
            <img
              src={image}
              alt="name"
              className="min-w-24 h-24 sm:w-40 sm:h-40  rounded-3xl cursor-pointer"
              onClick={(e) => {
                handelimg(e);
              }}
            />
            <img
              src={sideimages[0]}
              alt="name"
              className="min-w-24  h-24 sm:w-40 sm:h-40 rounded-3xl cursor-pointer"
              onClick={(e) => {
                handelimg(e);
              }}
            />
            <img
              src={sideimages[1]}
              alt="name"
              className="min-w-24  h-24 sm:w-40 sm:h-40 rounded-3xl cursor-pointer"
              onClick={(e) => {
                handelimg(e);
              }}
            />
          </div> */}
        </div>
        {/*title&desc part */}
        <div className="">
          <div className="flex flex-col gap-5 p-3 ">
            <p className="text-3xl font-extrabold h-14 w-96 text-start ">
              {name}
            </p>
            <div className="flex gap-5">
              <p className=" text-3xl font-bold">{`$${price}`}</p>
              <p className=" text-3xl font-bold opacity-40 line-through ">{`$360`}</p>
              <div className="bg-rose-200 text-lg rounded-full  items-center flex  justify-center pr-2 pl-2 text-red-100">
                {" "}
                - 40%{" "}
              </div>
            </div>
            <p className="opacity-70">{description}</p>
          </div>
          <div className="flex justify-center">
            <div className="w-96 h-0.5 sm:w-full bg-black opacity-20"></div>
          </div>
          {/*Select Colors part */}
          <div className="flex flex-col gap-4 p-3">
            <p className="opacity-75">Select Colors</p>
            <div className="flex gap-3">
            {Array.isArray(products.find((product) => product._id === productId)?.color) 
                  ? products.find((product) => product._id === productId).color.map((color, index) => (
                    <div
                        key={index}
                        className="relative rounded-full h-10 border border-stone-700 shadow-lg w-10 cursor-pointer"
                        style={{ backgroundColor: color }}
                        onClick={() => {
                          handleColorClick(color);
                          datahandler("color", color);
                        }}
                      >
                        {selectedColor === color && (
                          <FaCheck className="text-white absolute inset-0 m-auto flex justify-center items-center" />
                        )}
                    </div>
                  ))
                  : null
            }
          </div>
            {/*Choose Size part */}
            <div className="flex flex-col gap-4 p-3">
              <p className="opacity-75">Choose Size</p>
              <div className="flex gap-3">
              {(Array.isArray(products.find((product) => product._id === productId)?.size)
  ? products.find((product) => product._id === productId)?.size
  : [products.find((product) => product._id === productId)?.size]
)?.map((size, index) => (
  <div
    key={index}
    className={`rounded-full text-md w-20 h-10 flex items-center justify-center cursor-pointer hover:scale-105 ${
      isActive === size
        ? "bg-black text-white"
        : "bg-slate-300 text-black"
    }`}
    onClick={() => {
      handleClick(size);
      datahandler("size", size);
    }}
  >
    <span>{size}</span>
  </div>
))}

              </div>
            </div>
            <div className="flex justify-center">
              <div className="w-96 h-0.5 bg-black opacity-20"></div>
            </div>
            {/*Add to Cart part */}
            <div className="flex gap-6">
              <div className=" rounded-full gap-7  items-center bg-slate-300 p-4 cursor-pointer flex">
                <FaMinus
                  onClick={() => {counter > 0 && setcounter(counter - 1)
                    datahandler("quantity",counter-1)
                  }}
                />
                <p className="text-xl font-bold">{counter}</p>
                <FaPlus onClick={() => {setcounter(counter + 1)
                                        datahandler("quantity",counter+1)
                }} />
              </div>
              <div className=" rounded-full  bg-black text-xl text-center text-white w-72  p-4 cursor-pointer" onClick={sendDataHandler}>
                Add to Cart
              </div>
            </div>
          </div>
        </div>
      </div>
      {/*review&&comments part */}
      <div className="w-96 h-0.5 sm:w-3/4 hidden sm:block sm:ml-40 bg-black opacity-20"></div>
      <div className="flex justify-between  items-center p-6">
        <p className="text-3xl font-bold sm:ml-7">All Reviews</p>
        <div className="flex gap-3 items-center">
          <GiSettingsKnobs className="h-10 text-3xl pt-0.5 pb-0.5 pl-2 pr-2 cursor-pointer hover:scale-105 duration-150  bg-slate-200 rounded-full w-10  " />
         <Link to={`${id?"":"/sign"}`}>
          <div className="bg-black p-3 text-white rounded-full cursor-pointer hover:scale-105 duration-150 min-w-[140px] " onClick={handlePopupClose} >
            {id ? "Write a Review" : "signup to Write a Review"}
          </div>
          </Link>
        </div>
      </div>
      {isPopupOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-8 rounded-lg shadow-lg">
            <h2 className="text-2xl font-bold mb-4">Write a Review</h2>
            <textarea
              className="border p-2 w-full mb-4"
              placeholder="Write your comment here"
              onChange={reviewchangeHandler}
              rows="4"
            />
            <div className="mb-4">
              <label className="block text-lg mb-2">Rating:</label>
              <input
                type="number"
                max="5"
                min="1"
                onChange={ratechangeHandler}
                className="border p-2 w-full"
                placeholder="Rate 1 to 5"
              />
            </div>
            <div className="flex justify-between">
              <button
                className="bg-black text-white p-2 rounded hover:bg-gray-700 duration-150"
                onClick={sentReviewHandler}
              >
                Submit Review
              </button>
              <button
                className="bg-gray-300 p-2 rounded hover:bg-gray-400 duration-150"
                onClick={handlePopupClose}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
      {/*comments part */}
      <div className="p-4 flex flex-col gap-3 overflow-y-auto  items-start ">
        <div className="flex gap-4 items-center justify-center w-full">
        {reviews.map((review, index) => (
          <div key={index} className="p-3 flex flex-col gap-3  border border-slate-300 rounded-2xl  w-96">
            <div className="flex items-center justify-between">
              <div className="flex flex-col">
            <p className="text-2xl font-bold">{review.user.username}</p>
            <p>Review Id : {review._id}</p>
            </div>
            <MdDelete  className="text-2xl hover:text-red-500 cursor-pointer" onClick={()=>{deletehandler(review._id)}}/>
            </div>
            <div className="h-0.5 w-3/4 flex flex-col bg-black opacity-20 mt-4 mb-4"></div>
            <p className="opacity-50 text-lg">{review.review}</p>
            <p><span className="font-bold text.lg">Rate out of 5:</span> {review.rating}</p>
            <p>{ `posted in newDate`}</p>
          </div>
        ))}
        </div>

        <div className="flex w-full sm:justify-center">
          <div className=" p-3 text-center rounded-full border  border-slate-300 w-full sm:w-1/4 mt-3 cursor-pointer hover:bg-black hover:text-white ease-linear duration-150">
            Load More Reviews
          </div>
        </div>
      </div>
      <p className="text-3xl font-extrabold text-center w-full sm:mb-10">
        YOU MIGHT ALSO LIKE
      </p>
      <div className="relative ">
      <button
        onClick={scrollLeft}
        className="absolute left-0 top-1/2 z-50  transform -translate-y-1/2 bg-gray-300 p-2 rounded-full"
      >
        ◀
      </button>
      
      <div ref={containerRef} className="flex overflow-x-auto w-full no-scrollbar" >
        <div className="flex gap-2 pointer-events-auto justify-center w-full items-center">
        {products.filter((product) => product.subCategory._id== subCategory).slice(3).filter(product=>product._id!=productId ).map((item) => (
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
        className="absolute right-0 top-1/2 transform z-50 -translate-y-1/2 bg-gray-300 p-2 rounded-full"
      >
        ▶
      </button>
    </div>
    
    </div>
    <ToastContainer />
    </>
  );

}