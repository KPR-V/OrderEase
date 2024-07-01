import React from 'react'
import { useContext } from 'react';
import  DataContext  from '@/components/datacontext';
const page = () => {
  const {order, setOrder} = useContext(DataContext);
  return (
    <>
    <link href="https://fonts.googleapis.com/css?family=Bungee+Shade" rel="stylesheet" />
      <link href="https://fonts.googleapis.com/css?family=Changa" rel="stylesheet" />

      <div className="w-full h-full flex justify-center items-center flex-col text-white">
        <div className='flex flex-col justify-around gap-7 items-center bg-slate-50/60 backdrop-blur-md p-5 border-solid border-3 h-full border-black rounded-md w-full md:w-2/3 sm:backdrop-blur-sm '>
          <h1 className="text-3xl sm:text-3xl mb-1 font-extrabold text-black font-bungee">Orders</h1>
          <div className="dishesbox overflow-y-scroll overflow-x-hidden flex px-4 py-3 flex-col gap-3 w-full md:w-3/4 h-full text-black bg-zinc-500 font-changa ">
            
          </div>
        </div>
      </div>
    </>
  )
}

export default page
