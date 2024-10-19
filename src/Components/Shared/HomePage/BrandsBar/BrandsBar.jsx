import { SiZara } from "react-icons/si";
import vlogo from '../../../../../public/Brands/Versace.jpg'
import Glogo from '/Brands/GUCCI.jpg'
import Plogo from '/Brands/PRADA.jpg'
import Clogo from '/Brands/CK.jpg'

export default function BrandsBar() {
  return (
    <div className="bg-black w-full justify-around items-center p-3  sm:mt-0 sm:p-5 flex flex-wrap gap-4  " id="Brands">
    <img src={vlogo} alt="" className="w-16 h-4 sm:w-24 sm:h-5" />
    <SiZara className="text-white text-5xl sm:text-7xl" />
    <img src={Glogo} alt="" className="w-16 h-4 sm:w-24 sm:h-5" />
    <img src={Plogo} alt="" className="w-16 h-4 sm:w-24 sm:h-5" />
    <img src={Clogo} alt="" className="w-16 h-4 sm:w-24 sm:h-5" />
  </div>
  )
}
