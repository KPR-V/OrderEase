"use client";
import React, { useState } from 'react';
import { Eye, EyeOff } from "lucide-react";
import Link from 'next/link';
const LoginPage = () => {
  const [show, setshow] = useState(false);
  const handleClick = () => setshow(!show);
  return (
    <div className="bg-home bg-cover bg-center bg-gray-800 bg-opacity-50 w-full h-full flex justify-center items-center flex-col text-white ">
      <div className='flex flex-col justify-evenly gap-7 items-center backdrop-blur-sm p-5 border-solid border-3 border-black rounded-md w-full lg:w-2/3'>
        <h3 className="text-xl sm:text-3xl mb-3 font-extrabold text-black font-bungee">Login To Your Account</h3>
        <form className="flex flex-col gap-3 justify-center font-bungee " action="/register" method="post">
          <input className="px-3 text-center py-2 rounded-md bg-transparent outline-none border-3 bg-zinc-800" type="email" placeholder="email" name="email" />
          <div className='flex justify-center items-center mr-4'>
            <input className="px-3 text-center py-2 rounded-md bg-transparent outline-none border-3 bg-zinc-800" type={show ? "text" : "password"} placeholder="password" name="password" />
            <div className='-ml-10 cursor-pointer'>
              {show ? <Eye onClick={handleClick} /> : <EyeOff onClick={handleClick} />}
            </div>
          </div>
          <input className="px-5 text-sm sm:text-lg md:text-lg lg:text-xl xl:text-2xl py-2 rounded-md bg-blue-500 text-black " type="submit" value="Login" />
        </form>
        <div>
          <Link href="/register">
            <button type='submit' className='text-sm sm:text-xl md:text-lg lg:text-xl xl:text-2xl font-bungee cursor-pointer rounded-md border-3 text-black bg-orange-500 py-2 px-3 outline-none'>
              Create Account
            </button>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default LoginPage;