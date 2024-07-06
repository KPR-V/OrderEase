import DishCard from './dishcardadmin.js'
import Link from "next/link";
const Menu = () => {
    

  return (
    <>
      <link href="https://fonts.googleapis.com/css?family=Bungee+Shade" rel="stylesheet" />
      <link href="https://fonts.googleapis.com/css?family=Changa" rel="stylesheet" />
      <div className="w-full h-full flex justify-center items-center flex-col text-white">
        <div className='flex flex-col justify-around gap-7 items-center bg-slate-50/60 backdrop-blur-md p-5 border-solid border-3 h-full border-black rounded-md w-full md:w-2/3 sm:backdrop-blur-sm '>
          <h1 className="text-3xl sm:text-3xl mb-1 font-extrabold text-black font-bungee"> Menu</h1>
          <div className="dishesbox overflow-y-scroll scrollbar-custom overflow-x-hidden flex px-4 py-3 flex-col gap-3 w-full md:w-3/4 h-full text-black bg-zinc-500 font-changa ">
              <DishCard/>
          </div>
          <div className="flex gap-3">
          <Link href="/admin-dashboard/manage-menu/adddish">
            <button className="bg-custom-yellow text-black font-bold py-2 px-4 rounded-md">Add Dish</button>
              </Link>  
              <Link href="/admin-dashboard">
          <button
                type="button"
                className="bg-custom-yellow text-black font-bold py-2 px-4 rounded-md"
              >
                Go Back To Admin Dashboard
              </button>
            </Link>
              </div>
        </div>
      </div>
    </>
  );
};

export default Menu;
