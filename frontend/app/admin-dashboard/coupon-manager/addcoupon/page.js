'use client';

import React from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import Link from 'next/link';
import { addCouponToDB } from '@/components/addcoupontodb';
import { useRouter } from 'next/navigation';
const couponSchema = z.object({
    name: z.string().min(1, 'Coupon name is required'),
    discount: z.number().min(1, 'Discount must be at least 1%').max(100, 'Discount cannot exceed 100%'),
    expiry: z.enum(['one-time', 'lifetime'], 'Expiry type is required')
});

const CreateCoupon = () => {
const router = useRouter();
    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: zodResolver(couponSchema)
    });

    const onSubmit = async (data) => {
        console.log(data);
        try {
            await addCouponToDB(data);
            router.replace('/admin-dashboard/coupon-manager');
        }
        catch (error) {
            console.log(error);
        }
    };

    return (
        <>
            <link href="https://fonts.googleapis.com/css?family=Bungee+Shade" rel="stylesheet" />
            <link href="https://fonts.googleapis.com/css?family=Changa" rel="stylesheet" />
            <div className="w-full h-full flex justify-center items-center flex-col text-white">
                <div className='flex flex-col justify-around gap-7 items-center bg-slate-50/60 backdrop-blur-md p-5 border-solid border-3 h-full border-black rounded-md w-full md:w-2/3 sm:backdrop-blur-sm '>
                    <h1 className="text-3xl sm:text-3xl mb-1 font-extrabold text-black font-bungee">Create a Coupon</h1>
                    <div className=" overflow-y-scroll scrollbar-custom overflow-x-hidden flex px-4 py-3 flex-col gap-3 w-full md:w-3/4 h-full text-black bg-zinc-500 font-changa ">



                        <form onSubmit={handleSubmit(onSubmit)} className="bg-gray-100 flex flex-col justify-around p-4 min-h-full rounded shadow">


                            <div className="mb-4">
                                <label className="block text-sm text-center font-bold mb-2" htmlFor="name">
                                    Name of the Coupon
                                </label>
                                <input
                                    id="name"
                                    type="text"
                                    {...register('name')}
                                    className="w-full px-3 py-2 border rounded"
                                />
                                {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}
                            </div>



                            <div className="mb-4">
                                <label className="block text-sm text-center font-bold mb-2" htmlFor="discount">
                                    % of Discount
                                </label>
                                <input
                                    id="discount"
                                    type="number"
                                    {...register('discount', { valueAsNumber: true })}
                                    className="w-full px-3 py-2 border rounded"
                                />
                                {errors.discount && <p className="text-red-500 text-sm">{errors.discount.message}</p>}
                            </div>




                            <div className="mb-4">
                                <label className="block text-center text-sm font-bold mb-2">Expiry</label>
                                <div className='flex justify-around mt-3'>
                                    <label className="inline-flex items-center">
                                        <input
                                            type="radio"
                                            value="one-time"
                                            {...register('expiry')}
                                            className="form-radio"
                                        />
                                        <span className="ml-2">One-time</span>
                                    </label>
                                    <label className="inline-flex items-center ml-6">
                                        <input
                                            type="radio"
                                            value="lifetime"
                                            {...register('expiry')}
                                            className="form-radio"
                                        />
                                        <span className="ml-2">Lifetime</span>
                                    </label>
                                </div>
                                {errors.expiry && <p className="text-red-500 text-sm">{errors.expiry.message}</p>}
                            </div>




                            <div className="mb-4 flex justify-center">
                                <button
                                    type="submit"
                                    className="bg-blue-500 text-white px-4 py-2 rounded"
                                >
                                    Save
                                </button>
                            </div>



                        </form>
                    </div>
                    <Link href="/admin-dashboard/coupon-manager">
                        <button
                            className="bg-blue-500 text-white px-4 py-2 rounded"
                        >
                            Go Back
                        </button>

                    </Link>
                </div>
            </div>
        </>
    );
};

export default CreateCoupon;
