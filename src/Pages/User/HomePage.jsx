import React from 'react'
import Signupoffer from '../../Components/Shared/Signupoffer/Signupoffer'
import Contentphoto from '../../Components/Shared/Contentphoto/Contentphoto'
import BrandsBar from '../../Components/Shared/HomePage/BrandsBar/BrandsBar'
import Header from '../../Components/Shared/Header/Header'
import NewArrivals from '../../Components/Shared/HomePage/NewArrivals/NewArrivals'
import TopSelling from '../../Components/Shared/HomePage/TopSelling/Topselling'
import Footer from '../../Components/Shared/Footer/Footer'
export default function HomePage() {
  return (
    <div>
        <Signupoffer/>
        <Header/>
        <Contentphoto/>
        <BrandsBar/>
        <NewArrivals/>
        <TopSelling/>
        <Footer/>
    </div>
  )
}
