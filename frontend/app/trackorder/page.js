"use client";
import React, { useEffect, useContext, useMemo } from "react";
import { useSearchParams, useRouter } from "next/navigation";

import DataContext from "@/components/datacontext";

const OrderStatusPage = () => {
  const { instructions, setInstructions } = useContext(DataContext);
  const searchParams = useSearchParams();
  const queryTableNumber = searchParams.get("tableNumber");


  const router = useRouter();


  const filteredOrder = confirmedorder.filter((item) => item.tableNumber === queryTableNumber);




  return (
    <>
      <link href="https://fonts.googleapis.com/css?family=Bungee+Shade" rel="stylesheet" />
      <link href="https://fonts.googleapis.com/css?family=Changa" rel="stylesheet" />

      <div className="w-full h-full flex justify-center items-center flex-col text-white">
        <div className="flex flex-col justify-around gap-7 items-center bg-slate-50/60 backdrop-blur-md p-5 border-solid border-3 h-full border-black rounded-md w-full md:w-2/3 sm:backdrop-blur-sm">
          <h1 className="text-3xl sm:text-3xl mb-1 font-extrabold text-black font-bungee">Your Order</h1>
          <div className="dishesbox overflow-y-overlay overflow-x-hidden flex px-4 py-3 flex-col gap-3 w-full md:w-3/4 h-full text-black bg-zinc-500 font-changa scrollbar-custom">
            <div className="w-full flex flex-col bg-white overflow-y-overlay scrollbar-custom p-1 font-changa gap-3 h-full rounded-lg">
              <div className="w-full flex justify-start gap-3 text-xl px-3 py-1 h-8 ">
                <span>Table Number :</span>
                <span>{queryTableNumber}</span>
              </div>
              <ul className="w-full flex gap-3 text-xl px-3 py-1 h-3/4 ">
                {/* {filteredOrder.length > 0 && filteredOrder[0].order.map((item, index) => (
                  <li
                    key={index}
                    className="text-base md:text-lg lg:text-xl text-black flex font-bold justify-around items-center w-full my-2 md:my-3"
                  >
                    <span className="ml-3 text-2xl font-changa font-semibold">{item.name}</span>
                    <span className="mr-3 text-2xl font-changa font-semibold">{item.quantity}</span>
                  </li>
                ))} */}
              </ul>
              <div className="w-full flex flex-col items-center shadow-md h-14">
                Instructions
                <textarea
                  disabled
                  className="resize-none text-md text-center align-middle text-wrap outline-none h-12 w-full"
                  name="instructions"
                  id="instructions"
                  defaultValue={instructions ? instructions : "N/A"}
                ></textarea>
              </div>
              <div className="flex w-full font-bold items-center justify-around">
                <span className="text-lg">Order Status</span>
                <svg
                  className="rtl:rotate-180 w-3.5 h-3.5 ms-2"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 14 10"
                >
                  <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 5h12m0 0L9 1m4 4L9 9" />
                </svg>
                {orderStatusButton}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default OrderStatusPage;
