import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { FaHeartCirclePlus, FaHeartCircleCheck } from "react-icons/fa6";
import Swal from 'sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css'; 
import { getSpecificProduct } from '../../../Helper/Apis/Shared/Product/getSpecificProducts';
import { FaStarHalfAlt } from "react-icons/fa"; 
import { FaStar } from "react-icons/fa"; 
export default function ProductCard({ id, image, price, name, description }) {
  const [added, setAdded] = useState(false);  
  const [product, setProduct] = useState(null); 
  const [loading, setLoading] = useState(true); 

  const loginData = localStorage.getItem('loginData') ? JSON.parse(localStorage.getItem('loginData')) : {};
  const userid = loginData[0]?.Payload?.userId || null;

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const productData = await getSpecificProduct(id);
        setProduct(productData.data.product);
        setLoading(false);
        const wishlist = localStorage.getItem('wishlist') ? JSON.parse(localStorage.getItem('wishlist')) : [];
        const isProductInWishlist = wishlist.some(item => item.id === id); 
        setAdded(isProductInWishlist);  
      } catch (error) {
        console.error('Error fetching product:', error);
        setLoading(false);
      }
    };
    fetchProduct();
  }, [id]);

  const handleWishlistClick = () => {
    let wishlist = localStorage.getItem('wishlist') ? JSON.parse(localStorage.getItem('wishlist')) : [];

    if (!added) {
      Swal.fire({
        title: 'Add to Wishlist?',
        text: `Do you want to add ${product?.name} to your wishlist?`,
        icon: 'question',
        showCancelButton: true,
        confirmButtonText: 'Yes, add it!',
        cancelButtonText: 'No, cancel!',
      }).then((result) => {
        if (result.isConfirmed) {
          wishlist.push({
            id: product._id,
            name: product.name,
            price: product.price,
            image: product.imgCover,
            userId: userid, 
          });
          localStorage.setItem('wishlist', JSON.stringify(wishlist));
          setAdded(true);
          Swal.fire('Added!', `${product?.name} has been added to your wishlist.`, 'success');
        }
      });
    } else {
      Swal.fire({
        title: 'Remove from Wishlist?',
        text: `Do you want to remove ${product?.name} from your wishlist?`,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Yes, remove it!',
        cancelButtonText: 'No, cancel!',
      }).then((result) => {
        if (result.isConfirmed) {
          wishlist = wishlist.filter(item => item.id !== product._id);
          localStorage.setItem('wishlist', JSON.stringify(wishlist));
          setAdded(false);
          Swal.fire('Removed!', `${product?.name} has been removed from your wishlist.`, 'success');
        }
      });
    }
  };

  if (loading) {
    return <p>Loading product...</p>;
  }

  if (!product) {
    return <p>Product not found!</p>;
  }

  return (
    <div className="flex justifiy-center  sm:w-auto p-3 mr-3 mb-3 hover:scale-105 hover:shadow-xl duration-150  border justify-center rounded-3xl  cursor-pointer  min-w-40">
      <div className="max-w-xs w overflow-hidden rounded-2xl bg-white">
        <Link to={`/product/${id}`}>
          <img className=" h-48 object-cover rounded-3xl " src={image} alt={name} />
        </Link>
        <div className="py-4">
          <div className="flex justify-between items-start">
            <Link to={`/product/${id}`}>
              <p className="font-bold text-md mb-2">{name}</p>
            </Link>
            
           
          </div>
          <div className='flex items-center  justify-between '>
            <div className='flex gap-3'>
               <span className='flex gap-1'>
          <FaStar className=' text-yellow' />
          <FaStar  className=' text-yellow' />
          <FaStar  className=' text-yellow' />
          <FaStarHalfAlt  className=' text-yellow' />
          </span>
          <span>3.5/ <span className='opacity-50'>5</span></span>
            </div>
            <div>
            {added ? (
              <FaHeartCircleCheck
                className="text-xl text-green-100"
                onClick={handleWishlistClick}  
              />
            ) : (
              <FaHeartCirclePlus
                className="text-xl"
                onClick={handleWishlistClick} 
              />
            )}
           </div>
          </div>
          
          <Link to={`/product/${id}`}>
            <div className="flex justify-between w-full mt-2 items-center">
              <p className="font-bold text-xl">{price}</p>
              <div className="bg-rose-200 text-xs rounded-full items-center flex w-12 h-5 justify-center pr-2 pl-2 text-red-100">
                - 20%
              </div>
            </div>
          </Link>
          <Link to={`/product/${id}`}>
            <p className="text-xs">{description}</p>
          </Link>
        </div>
      </div>
    </div>
  );
}
