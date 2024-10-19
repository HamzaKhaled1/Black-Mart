import { CgProfile } from "react-icons/cg";
import { FaHeart } from "react-icons/fa";
import { IoIosArchive } from "react-icons/io";

export default function ProfileNavBar({name,setState,logout,flag}) {
  console.log(flag)
  return (
    <div className={`p-14 pt-10 border  flex-col gap-10 items-center rounded-3xl  md:flex ${flag ? "block" : "hidden"}`} >
        <div className="items-center flex flex-col gap-4">
        <img src="/logos/blank-profile-picture-973460_960_720.webp" alt=" profile" className="w-32 h-32 rounded-full border-2" />
        <span className="font-bold text-3xl">{name}</span>
        </div>

        <ul className=" flex flex-col gap-4">
            <li className="hover:translate-x-2 duration-150 hover:bg-black hover:text-white font-bold text-2xl cursor-pointer flex gap-2 border py-3 px-7 border-gray-300 rounded-3xl items-center" onClick={() => setState("profile")}> <CgProfile /> Profile</li>
            <li className="hover:translate-x-2 duration-150 hover:bg-black hover:text-white font-bold text-2xl cursor-pointer  flex gap-2  border  py-3 px-7 border-gray-300 rounded-3xl items-center"  onClick={() => setState("Wishlist")}>  <FaHeart /> Wishlist</li>
            <li className="hover:translate-x-2 duration-150 hover:bg-black hover:text-white font-bold text-2xl cursor-pointer flex gap-2  border  py-3 px-7 border-gray-300 rounded-3xl" onClick={() => setState("Orders")}>  <IoIosArchive /> Orders</li>
        </ul>
        <button className="bg-red-100 text-white p-2 w-40 rounded-3xl text-xl hover:bg-red-200 cursor-pointer" onClick={logout}>logout</button>

    </div>
  )
}
