'use client';
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { getCouponFromDB } from '@/components/getcouponfromdb';

const CouponManagement = () => {
    const [coupons, setCoupons] = useState([]);
    useEffect(() => {
        const fetchData = async () => {
            const data = await getCouponFromDB();
            console.log("data",data);
            setCoupons(data);
        };
        fetchData();
    }, [])

    return (
        <>
            <link href="https://fonts.googleapis.com/css?family=Bungee+Shade" rel="stylesheet" />
            <link href="https://fonts.googleapis.com/css?family=Changa" rel="stylesheet" />
            <div className="w-full h-full flex justify-center items-center flex-col text-white">
                <div className='flex flex-col justify-around gap-7 items-center bg-slate-50/60 backdrop-blur-md p-5 border-solid border-3 h-full border-black rounded-md w-full md:w-2/3 sm:backdrop-blur-sm '>
                    <h1 className="text-3xl sm:text-3xl mb-1 font-extrabold text-black font-bungee"> Coupon Management</h1>
                    <div className=" overflow-y-scroll scrollbar-custom overflow-x-hidden flex px-4 py-3 flex-col gap-3 w-full md:w-3/4 h-full text-black bg-zinc-500 font-changa ">
                        {coupons.map((coupon) => (
                            <div key={coupon.id} className="flex justify-between items-center mb-4 p-2 bg-white rounded shadow">
                                <div className="flex-1">
                                    <p className="font-bold">{coupon.name}</p>
                                    <p>Discount: {coupon.discount}%</p>
                                    <p>Expiry: {coupon.expiry}</p>
                                </div>
                                <Link href={`/admin-dashboard/coupon-manager/editcoupon/${encodeURIComponent(coupon.name)}`}>
                                    <button
                                        className="bg-yellow-500 text-white px-4 py-2 rounded"
                                    >
                                        Edit
                                    </button>
                                </Link>
                            </div>
                        ))}
                    </div>
                    <Link href="/admin-dashboard/coupon-manager/addcoupon">
                        <button
                            className="bg-blue-500 text-white px-4 py-2 rounded mb-4"
                        >
                            Add Coupon
                        </button>
                    </Link>
                </div>
            </div>
        </>
    );
};

export default CouponManagement;
