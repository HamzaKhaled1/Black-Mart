/* eslint-disable react/prop-types */
import { Link, useParams } from 'react-router-dom';
export default function subCategoryCard({ image, name ,id,Flag }) {
  return (<>
 <Link to={`/subCategory/${id}`} className="group">
    <div
  style={{ backgroundImage: `url(${image})` }}
  className="flex shadow-lg w-72 h-72
  rounded-lg transition-transform duration-300 ease-in-out hover:scale-105 bg-cover bg-center
  items-end relative group"
>
  <div className="bg-black/50 backdrop-blur-sm flex w-full p-4 rounded items-center justify-center text-white
  absolute bottom-0 transition-all duration-500 ease-in-out group-hover:backdrop-blur-sm group-hover:bg-black/50
  group-hover:h-full "
  >
    <h1 className="text-xl font-bold transition-opacity duration-500 ease-in-out opacity-100  group-hover:opacity-100">
      {name}
    </h1>
  </div>
</div>




    </Link>
    </>
  )
}
