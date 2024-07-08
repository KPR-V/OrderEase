"use client";
import DishCard from './dishcard.js';
import Link from "next/link";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import app from "@/components/config";
import { useRouter } from 'next/navigation.js';
import { useEffect, useState } from 'react';
import SearchForm from '@/components/searchbar.js';

const Menu = () => {
  const auth = getAuth(app);
  const router = useRouter();
  const [filteredDishes, setFilteredDishes] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  let number;
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (!user) {
        router.replace('/');
      } else {
        const phoneNumber = user.phoneNumber;
        phoneNumber && (number = phoneNumber);
      }
    });
  }, [auth, router]);

  return (
    <>
      <link href="https://fonts.googleapis.com/css?family=Bungee+Shade" rel="stylesheet" />
      <link href="https://fonts.googleapis.com/css?family=Changa" rel="stylesheet" />

      <div className="w-full h-full flex justify-center items-center flex-col text-white">
        <div className='flex flex-col justify-around gap-7 items-center bg-slate-50/60 backdrop-blur-md p-5 border-solid border-3 h-full border-black rounded-md w-full md:w-2/3 sm:backdrop-blur-sm '>
          <h1 className="text-3xl sm:text-3xl mb-1 font-extrabold text-black font-bungee">Our Menu</h1>
          <SearchForm setFilteredDishes={setFilteredDishes} setSearchQuery={setSearchQuery} />
          <div className="dishesbox overflow-y-scroll scrollbar-custom overflow-x-hidden flex px-4 py-3 flex-col gap-3 w-full md:w-3/4 h-full text-black bg-zinc-500 font-changa ">
            <DishCard filteredDishes={filteredDishes} searchQuery={searchQuery} number={number} />
          </div>
          <div className='flex w-2/3 justify-around'>
            <Link href="/orderconfirmation">
              <button type="button" className="text-black bg-orange-500 hover:bg-orange-600 focus:ring-4 focus:outline-none  font-medium rounded-lg text-lg px-5 py-2.5 text-center inline-flex items-center">
                NEXT
                <svg className="rtl:rotate-180 w-3.5 h-3.5 ms-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                  <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 5h12m0 0L9 1m4 4L9 9" />
                </svg>
              </button>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default Menu;
