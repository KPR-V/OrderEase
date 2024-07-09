'use client';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import Link from 'next/link';
import { getCouponFromDB } from '@/components/getcouponfromdb';
import { editCouponAndDB } from '@/components/editcouponanddb';
import { useRouter } from 'next/navigation';

const couponSchema = z.object({
    name: z.string().min(1, 'Coupon name is required'),
    discount: z.number().min(1, 'Discount must be at least 1%').max(100, 'Discount cannot exceed 100%'),
    expiry: z.enum(['one-time', 'lifetime'], 'Expiry type is required')
});

const EditCoupon = ({ params }) => {
    const [initialData, setInitialData] = useState(null);
    const { register, handleSubmit, setValue, formState: { errors } } = useForm({
        resolver: zodResolver(couponSchema),
        defaultValues: {
            name: '',
            discount: '',
            expiry: 'one-time'
        }
    });

    useEffect(() => {
        const fetchData = async () => {
            const couponName = params?.couponName ? decodeURIComponent(params.couponName) : '';
            

            const data = await getCouponFromDB();
            

            
            if (Array.isArray(data) && data.length > 0) {
                
                const matchingCoupon = data.find(coupon => coupon.name.trim() === couponName.trim());
                
                if (matchingCoupon) {
                    setInitialData(matchingCoupon);
                }
            } else {
                console.error("Data is not an array or is empty:", data);
            }
        };
        fetchData();
    }, [params?.couponName]);

    useEffect(() => {
        if (initialData) {
            setValue('name', initialData.name);
            setValue('discount', initialData.discount);
            setValue('expiry', initialData.expiry);
        }
    }, [initialData, setValue]);
 
const router= useRouter();

    const onSubmit = async (data) => {
        
        try {
            await editCouponAndDB(data);
            router.replace('/admin-dashboard/coupon-manager');
        } catch (error) {
            console.log(error);
        }
    };

    if (!initialData) {
        return <div>Loading...</div>;
    }

    return (
        <>
            <link href="https://fonts.googleapis.com/css?family=Bungee+Shade" rel="stylesheet" />
            <link href="https://fonts.googleapis.com/css?family=Changa" rel="stylesheet" />
            <div className="w-full h-full flex justify-center items-center flex-col text-white">
                <div className='flex flex-col justify-around gap-7 items-center bg-slate-50/60 backdrop-blur-md p-5 border-solid border-3 h-full border-black rounded-md w-full md:w-2/3 sm:backdrop-blur-sm '>
                    <h1 className="text-3xl sm:text-3xl mb-1 font-extrabold text-black font-bungee">Edit Coupon</h1>
                    <div className="overflow-y-scroll scrollbar-custom overflow-x-hidden flex px-4 py-3 flex-col gap-3 w-full md:w-3/4 h-full text-black bg-zinc-500 font-changa ">
                        <form onSubmit={handleSubmit(onSubmit)} className="bg-gray-100 p-4 min-h-full flex flex-col justify-around rounded shadow">
                            <div className="mb-4">
                                <label className="block text-sm text-center font-bold mb-2" htmlFor="name">
                                    Name of the Coupon
                                </label>
                                <input
                                    readOnly
                                    id="name"
                                    type="text"
                                    {...register('name')}
                                    className="w-full px-3 py-2 border rounded"
                                />
                                {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}
                            </div>

                            <div className="mb-4">
                                <label className="block text-center text-sm font-bold mb-2" htmlFor="discount">
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

                            <div className="mb-4 flex justify-center ">
                                <button
                                    type="submit"
                                    className="bg-blue-500 text-white px-4 py-2 rounded"
                                >
                                    Save Changes
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

export default EditCoupon;
