import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';

export default function Contentphoto() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const loginData = localStorage.getItem("loginData");
    setIsLoggedIn(!!loginData); 
  }, []);

  return (
    <div className="relative bg-photocolor h-[30rem] md:bg-[url('/Body/Body.jpg')] bg-cover sm:mb-0 mb-[18.5rem] bg-center sm:h-[30rem] md:h-[40rem] w-full">
      <div className="absolute top-4 sm:top-32 sm:left-8 flex justify-center flex-col md:left-24 ">
        <div className="ml-4">
          <h1 className="text-3xl sm:text-5xl font-extrabold sm:w-[22rem] md:w-[27rem]">
            FIND CLOTHES THAT MATCHES YOUR STYLE
          </h1>
          <p className="opacity-70 sm:opacity-50 sm:w-[24rem] md:w-[30rem] mt-3 md:mt-5 text-sm sm:text-base">
            Browse through our diverse range of meticulously crafted garments, designed to bring out your individuality and cater to your sense of style.
          </p>
        </div>
        <div className="bg-black ml-4 sm:ml-0 text-white rounded-full mt-4 md:mt-5 p-3 md:p-4 w-72 md:w-40 cursor-pointer text-center hover:bg-opacity-75">
          <Link to={isLoggedIn ? '/Categories' : '/Sign'}>
            <span>{isLoggedIn ? 'Start Shopping' : 'Join Us Now'}</span>
          </Link>                                                           
        </div>
        <div className="flex flex-wrap ml-auto sm:flex-nowrap gap-4 justify-center sm:gap-6 bg-transparent mt-5 md:mt-6">
          <div className="flex flex-col gap-1 justify-start">
            <p className="text-2xl sm:text-3xl font-bold font-satoshi">200+</p>
            <p className="opacity-50 text-sm sm:text-base">International Brands</p>
          </div>
          <div className="flex flex-col gap-1 justify-center">
            <p className="text-2xl sm:text-3xl font-bold font-satoshi">2000+</p>
            <p className="opacity-50 text-sm sm:text-base">High-Quality Products</p>
          </div>
          <div className="flex flex-col gap-1 justify-center">
            <p className="text-2xl sm:text-3xl font-bold font-satoshi">3000+</p>
            <p className="opacity-50 text-sm sm:text-base">Happy Customers</p>
          </div>
        </div>
        <img src="/Body/Mobileview.jpg" alt="" className="sm:hidden mb-4 sm:mb-0" />
      </div>
    </div>
  );
}
