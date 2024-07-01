"use client";
import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { getdishesfromdb } from '@/components/getdishesfromdb';
import Link from 'next/link';
import { deleteDish } from '@/components/getdishesfromdb';
import { useRouter } from 'next/navigation';
const DishCard = () => {
  const [dishes, setDishes] = useState([]);
  // const [quantity, setQuantity] = useState(0);
  const [expanded, setExpanded] = useState(false);

  const router = useRouter();
  useEffect(() => {
    const fetchDishes = async () => {
      const dishesData = await getdishesfromdb();
      setDishes(dishesData);
    };

    fetchDishes();
  }, []);

  // const addItemToOrder = (dish, quantity) => {
  //   setOrder([...order, { ...dish, quantity }]);
  // };

  const handleDeleteDish = async (id) => {
    try {
      const result = await deleteDish(id);
      if (result.success) {
        router.refresh('/admin-dashboard/manage-menu');
      }
    } catch (error) {
      console.error('Error deleting dish:', error.message);
    }
  };

  return (
    <>

      {dishes.length === 0 ? (
        <h1 className="text-3xl font-bungee font-bold text-center text-black">No dishes found</h1>
      ) : (
        dishes.map((dish, index) => (
          <React.Fragment key={index}>
            <div className={`w-full min-h-[320px] items-center flex flex-col lg:flex-row gap-3 text-black font-extrabold rounded-lg bg-slate-50 transition-all duration-300 ${expanded ? 'h-auto overflow-y-scroll max-h-96 no-scrollbar' : 'h-64 overflow-y-scroll scrollbar-custom'}`}>
            <div className={`w-2/3 h-full md:h-3/4 lg:w-1/2 flex-shrink-0 ${expanded ? 'h-64 md:h-60 lg:h-96' : 'h-48 lg:h-full'}`}>
                <Image
                  src={dish.image}
                  width={320}
                  height={320}
                  alt='dish image'
                  priority={true}
                  className={`w-full h-full mt-3 object-fit rounded-t-lg lg:rounded-none lg:rounded-l-lg transition-all duration-300 ${expanded ? 'lg:h-64' : ''}`}
                />
              </div>
              <div className={`flex flex-col items-center justify-between w-full h-full lg:w-1/2 p-3 ${expanded ? 'gap-4 pb-2' : ''}`}>
                <div className='flex flex-col items-center text-center'>
                  <h2 className="font-bold text-xl mb-2 text-black">{dish.name}</h2>
                  <h2 className="font-bold text-md mb-2 text-black">{dish.category}</h2>
                  <p className={`text-sm tracking-tighter ${expanded ? '' : 'line-clamp-2'}`}>
                    {dish.description}
                  </p>
                  <button className='pt-2 text-blue-500' onClick={() => setExpanded(!expanded)}>
                    {expanded ? 'Read Less' : 'Read More'}
                  </button>
                </div>


                <div className={`flex flex-col lg:flex-row text-sm justify-center w-full items-center ${expanded ? "gap-2 pb-2" : "gap-3"} `}>
                  <div className=" items-center justify-center gap-2">
                    {/* <label className="text-sm font-bold mb-2 lg:mb-2 flex items-center">
                      Quantity:
                      <input
                        type="number"
                        value={quantity}
                        onChange={(e) => setQuantity(Number(e.target.value))}
                        min={0}
                        className="shadow appearance-none border text-center rounded w-full py-1 px-2 leading-tight focus:outline-none focus:shadow-outline ml-2"
                        style={{ minWidth: '50px' }}
                      />
                    </label> */}
                    <span className='mb-2 lg:mb-0 lg:ml-2'> Price: ₹ {dish.price} </span>
                  </div>
                  {/* {quantity > 0 && (
                    <button
                      className="bg-red-500 hover:bg-red-700 text-black font-bold py-1 px-2 rounded focus:outline-none focus:shadow-outline mt-2 lg:mt-0 w-full lg:w-auto"
                      onClick={() => addItemToOrder(dish.name, quantity)}
                    >
                      Add Item
                    </button>
                  )} */}
                </div>
                <div className='flex justify-around w-full text-black'>
                  <Link href={`/admin-dashboard/manage-menu/editdish/${dish._id}`}>
                    <button className="bg-yellow-500 hover:bg-yellow-700  font-bold py-1 px-2 rounded focus:outline-none focus:shadow-outline mt-2 w-full lg:w-auto">
                      Edit
                    </button>
                  </Link>

                  <button onClick={() => handleDeleteDish(dish._id)} className="bg-red-500 hover:bg-red-700  font-bold py-1 px-2 rounded focus:outline-none focus:shadow-outline mt-2 w-full lg:w-auto">
                    Delete
                  </button>
                  <button className="bg-blue-500 hover:bg-blue-700  font-bold py-1 px-2 rounded focus:outline-none focus:shadow-outline mt-2 w-full lg:w-auto">
                    Like
                  </button>
                </div>

              </div>
            </div>
            <style jsx>{`
              .no-scrollbar::-webkit-scrollbar {
                display: none;
              }
              .no-scrollbar {
                -ms-overflow-style: none;  /* Internet Explorer 10+ */
                scrollbar-width: none;  /* Firefox */
              }
            `}</style>
          </React.Fragment>
        ))
      )}

    </>
  );
};

export default DishCard;
