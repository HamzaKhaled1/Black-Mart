import { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Swal from 'sweetalert2';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import { FaHeart } from "react-icons/fa6";
import ProfileNavBar from './ProfileNavBar';
import Prof from './Prof';
import Wishlist from './wishlist/Wishlist.jsx';
import Orders from './Orders.jsx';
import { AiOutlineMenu } from "react-icons/ai";
export default function Profile() {
  const [state, setState] = useState("profile");
  const [loginData, setLoginData] = useState(null);
  const [userOrders, setUserOrders] = useState([]); 
  const [flag, setFlag] = useState(false);
  const [userid ,setuserId]=useState(null)
  const navigate = useNavigate();

  useEffect(() => {
    const storedLoginData = localStorage.getItem('loginData');
    
    if (storedLoginData) {
      setLoginData(JSON.parse(storedLoginData));
      console.log(JSON.parse(storedLoginData));
    }
  }, []);


  console.log(userid)
  const handleLogout = () => {
    Swal.fire({
      title: 'Are you sure?',
      text: 'You won\'t be able to revert this!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, Logout!'
    }).then((result) => {
      if (result.isConfirmed) {
        localStorage.removeItem('loginData');
        localStorage.removeItem('filters');
        localStorage.removeItem('useremail');
        navigate('/login'); 
      }
    });
  };

  const handleClick = () => {
    setFlag(!flag);
  }

  if (!loginData) {
    return (
      <>
        <Header />
        <p className="text-center text-3xl mb-[8.9rem] text-red-500">
          No user data found
          <Link to="/sign">
            <span className='text-black ml-5 underline text-md'>click here to join us!</span>
          </Link>
        </p>
        <Footer />
      </>
    );
  }

  const renderContent = () => {
    switch (state) {
      case "profile":
        return <Prof name={loginData[0]?.Payload?.username} email={loginData[0]?.Payload?.email} role={loginData[0]?.Payload?.role} flag={flag} userid={loginData[0].Payload.userId} />;
      case "Wishlist":
        return <Wishlist flag={flag} />;
      case "Orders":
        return <Orders userOrders={userOrders} flag={flag} />;
      default:
        return null;
    }
  };

  return (
    <>
      <Header />
      <div className='flex sm:p-8 pt-0 gap-3 '>
        <ProfileNavBar name={loginData[0]?.Payload?.username} setState={setState} logout={handleLogout} flag={flag} />
        <AiOutlineMenu className='text-3xl cursor-pointer sm:hidden' onClick={handleClick} />
        {renderContent()}
      </div>
      <Footer />
    </>
  );
}
