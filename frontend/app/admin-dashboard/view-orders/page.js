"use client";
import React, { useEffect } from 'react';
import Link from 'next/link';
const OrderPage = () => {







  return (
    <>
      <link href="https://fonts.googleapis.com/css?family=Bungee+Shade" rel="stylesheet" />
      <link href="https://fonts.googleapis.com/css?family=Changa" rel="stylesheet" />

      <div className="w-full h-full flex justify-center items-center flex-col text-white">
        <div className='flex flex-col justify-around gap-7 items-center bg-slate-50/60 backdrop-blur-md p-5 border-solid border-3 h-full border-black rounded-md w-full md:w-2/3 sm:backdrop-blur-sm '>
          <h1 className="text-3xl sm:text-3xl mb-1 font-extrabold text-black font-bungee">Orders</h1>
          <div className="dishesbox overflow-y-scroll overflow-x-hidden flex px-4 py-3 flex-col gap-3 w-full md:w-3/4 h-full text-black bg-zinc-500 font-changa scrollbar-custom">
            {/* {orders.length === 0 ? (
              <div className="text-center text-xl text-black">No orders available</div>
            ) : (
              orders.map((order, index) => (
                <div key={index} className='w-full flex flex-col bg-white overflow-y-overlay scrollbar-custom p-1 font-changa gap-3 h-64 rounded-lg'>
                  <div className='w-full flex justify-start gap-3 text-xl px-3 py-1 h-8 '>
                    <span>Table Number :</span>
                    <span>{order.tableNumber}</span>
                  </div>
                  <ul className='w-full flex justify-between gap-3 text-xl px-3 py-1 h-3/4 bg-red-600'>
                    {order.order.map((item, itemIndex) => (
                      <li
                        key={itemIndex}
                        className="text-base md:text-lg lg:text-xl text-black flex font-bold justify-between w-full my-2 md:my-3"
                      >
                        <span className='ml-3'>
                          {item.name}
                        </span>
                        <span className='mr-3'>{item.quantity}</span>
                      </li>
                    ))}
                  </ul>
                  <div className='w-full h-14 '>
                    <textarea disabled className='resize-none bg-violet-600 text-start text-wrap outline-none h-12 w-full' name="instructions" id="instructions" defaultValue={order.instructions}></textarea>
                  </div>
                  <div className='flex w-full justify-around'>
                    <button onClick={() => handleCookingClick(order.tableNumber)} className="text-black outline-none bg-orange-500 hover:bg-orange-600 focus:ring-4 focus:outline-none rounded-lg px-5 py-2.5">Cooking</button>
                    <button onClick={() => handleArrivingClick(order.tableNumber)} className="text-black outline-none bg-green-500 hover:bg-green-600 focus:ring-4 focus:outline-none rounded-lg px-4 py-2">Arriving</button>
                  </div>
                </div>
              ))
            )} */}
          </div>
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
    </>
  );
};

export default OrderPage;
