import { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaHeartCircleCheck } from "react-icons/fa6";
import Swal from 'sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';

export default function WishlistCard({ name, price, image, id }) {
  const [added, setAdded] = useState(true); 

  const handleRemoveFromWishlist = () => {
    Swal.fire({
      title: 'Remove from Wishlist?',
      text: `Do you want to remove ${name} from your wishlist?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, remove it!',
      cancelButtonText: 'No, cancel!',
    }).then((result) => {
      if (result.isConfirmed) {
        // Assuming 'wishlist' is retrieved from local storage
        let wishlist = JSON.parse(localStorage.getItem('wishlist')) || [];
        
        // Filter out the product by ID
        wishlist = wishlist.filter(item => item.id !== id);
        localStorage.setItem('wishlist', JSON.stringify(wishlist));
        setAdded(false); // Update the state to reflect that the item is removed
        Swal.fire('Removed!', `${name} has been removed from your wishlist.`, 'success');
      }
    });
  };

  return (
    <div className="flex flex-wrap items-center border rounded-3xl justify-center p-3 cursor-pointer duration-150 hover:scale-105 hover:shadow-xl min-w-60">
      <div className="max-w-xs overflow-hidden rounded-2xl bg-white">
        <Link to={`/product/${id}`}>
          <img className="w-full h-48 object-cover" src={image} alt={name} />
        </Link>
        <div className="py-4">
          <div className="flex justify-between items-center">
            <Link to={`/product/${id}`}>
              <p className="font-bold text-md mb-2">{name}</p>
            </Link>
            
          </div>
          <div className='flex gap-16'>
          <Link to={`/product/${id}`}>
            <div className="flex gap-4 items-center">
              <p className="font-bold text-xl">{price}</p>
              <div className="bg-rose-200 text-xs rounded-full items-center flex w-12 h-5 justify-center pr-2 pl-2 text-red-100">
                - 40%
              </div>
            </div>
          </Link>
          {added && (
              <FaHeartCircleCheck
                className="text-xl text-green-100"
                onClick={handleRemoveFromWishlist}
              />
            )}
                </div>
        </div>
      </div>
    </div>
  );
}
