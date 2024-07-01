"use client"
import { getAuth,onAuthStateChanged } from "firebase/auth";
import app  from "@/components/config";
import { useRouter } from "next/navigation";
import React, { useEffect} from "react";
import Loginforcustomer from "@/components/loginforcustomer";
const HomePage = () => {
 const auth = getAuth(app)
  const router = useRouter()  
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        router.replace('/menu')
      } 
    })
  }, [auth,router])
  return (
    <>
      <link href="https://fonts.googleapis.com/css?family=Bungee+Shade" rel="stylesheet" />
      <link href="https://fonts.googleapis.com/css?family=Changa" rel="stylesheet" />
      <div className=" w-full h-full flex justify-center items-center">
        <div className=' flex flex-col justify-evenly gap-9 items-center backdrop-blur-sm border-solid border-3 border-black w-full lg:w-2/3 h-2/3' >
          <div className='flex justify-center items-center flex-col gap-5'>
            <h1 className="text-xl sm:text-3xl md:text-4xl lg:text-4xl xl:text-4xl font-black text-black font-bungee">
              Welcome to Mocha Cafe
            </h1>
            <p className="text-sm sm:text-lg md:text-xl lg:text-xl xl:text-xl font-changa font-black">
              Browse our menu and place your order effortlessly.
            </p>
          </div>
          <div className='w-full lg:w-1/3 flex flex-col justify-center items-center gap-5'>
            <Loginforcustomer />
            {/* <Link href="/menu">
              <button type='submit' className='text-sm sm:text-lg md:text-lg lg:text-xl xl:text-2xl font-changa cursor-pointer rounded-md border-3 text-black bg-custom-red py-2 px-3 outline-none'>
                View Menu
              </button>
            </Link> */}
          </div>
        </div>
      </div>
    </>
  )
};

export default HomePage;
