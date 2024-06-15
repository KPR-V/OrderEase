"use client";
import React from 'react';
import Link from 'next/link';
const AdminDashboard = () => {
    return (
        <>
            <link href="https://fonts.googleapis.com/css?family=Bungee+Shade" rel="stylesheet" />
            <link href="https://fonts.googleapis.com/css?family=Changa" rel="stylesheet" />
            <div className="bg-home bg-cover bg-center bg-gray-800 bg-opacity-50 w-full h-full flex justify-center items-center">
                <div className=' flex flex-col justify-evenly gap-9 items-center backdrop-blur-sm border-solid border-3 border-black w-full lg:w-2/3 h-2/3' >
                    <div className='flex justify-center items-center flex-col gap-5'>
                        <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-4xl xl:text-4xl font-black text-black font-bungee">
                            Admin Dashboard
                        </h1>
                        <p className="text-md sm:text-lg md:text-xl lg:text-xl xl:text-xl font-changa font-black">
                            Manage your cafe effortlessly.
                        </p>
                    </div>
                    <div className='w-full lg:w-1/3 flex flex-col justify-center items-center gap-5'>
                    <Link href="/admin-dashboard/manage-menu">
                        <button name='menu' type='submit' className='text-md sm:text-lg md:text-lg lg:text-xl xl:text-2xl font-changa cursor-pointer rounded-md border-3 text-black bg-orange-500 py-2 px-3 outline-none'>
                            Manage Menu
                        </button>
                    </Link>
                    <Link href="/admin-dashboard/view-orders">
                        <button name='orders' type='submit' className='text-md sm:text-lg md:text-lg lg:text-xl xl:text-2xl font-changa cursor-pointer rounded-md border-3 text-black bg-blue-500 py-2 px-3 outline-none'>
                            View Orders
                        </button>
                    </Link>
                    <Link href="/admin-dashboard/track-payments">
                        <button name='payments' type='submit' className='text-md sm:text-lg md:text-lg lg:text-xl xl:text-2xl font-changa cursor-pointer rounded-md border-3 text-black bg-green-500 py-2 px-3 outline-none'>
                            Track Payments
                        </button>
                    </Link>
                    </div>
                </div>
            </div>
        </>
    )
};

export default AdminDashboard;