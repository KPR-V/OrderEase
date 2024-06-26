"use client"
import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import getdishesfromdb from '@/components/getdishesfromdb';

const DishCard = () => {
  const [dishes, setDishes] = useState([]);
  const [quantity, setQuantity] = useState(0);
  const [expanded, setExpanded] = useState(false);
  const [order, setOrder] = useState([]);

  useEffect(() => {
    const fetchDishes = async () => {
      const dishesData = await getdishesfromdb();
      setDishes(dishesData);
    };
    
    fetchDishes();
  }, []);

  const addItemToOrder = (dish, quantity) => {
    setOrder([...order, { ...dish, quantity }]);
  };

  return (
    <>
      {dishes.length === 0 ? (
        <h1 className="text-3xl font-bungee font-bold text-center text-black">No dishes found</h1>
      ) : (
        dishes.map((dish, index) => (
          <React.Fragment key={index}>
            <div className={`w-full min-h-[320px] flex flex-col lg:flex-row gap-3 text-black font-extrabold rounded-lg bg-slate-50 transition-all duration-300 ${expanded ? 'h-auto overflow-y-scroll max-h-96 no-scrollbar' : 'h-64 overflow-y-scroll'}`}>
              <div className={`w-full lg:w-1/2 flex-shrink-0 ${expanded ? 'h-64 lg:h-96' : 'h-48 lg:h-full'}`}>
                <Image
                  src={dish.image}
                  width={320}
                  height={320}
                  alt='dish image'
                  priority={true}
                  className={`w-full h-full object-fit rounded-t-lg lg:rounded-none lg:rounded-l-lg transition-all duration-300 ${expanded ? 'lg:h-64' : ''}`}
                />
              </div>
              <div className={`flex flex-col items-center justify-between w-full lg:w-1/2 p-4 ${expanded ? 'gap-4 pb-2' : ''}`}>
                <div className='flex flex-col items-center text-center'>
                  <h2 className="font-bold text-xl mb-2 text-black">{dish.name}</h2>
                  <h2 className="font-bold text-lg mb-2 text-black">{dish.category}</h2>
                  <p className={`text-sm tracking-tighter ${expanded ? '' : 'line-clamp-2'}`}>
                    {dish.description}
                  </p>
                  <button className='pt-2 text-blue-500' onClick={() => setExpanded(!expanded)}>
                    {expanded ? 'Read Less' : 'Read More'}
                  </button>
                </div>

             
                <div className={`flex flex-col lg:flex-row text-sm justify-center w-full items-center ${expanded ? "gap-2 pb-2" : "gap-3"} `}>
                  <div className="flex-grow gap-2">
                    <label className="text-sm font-bold mb-2 lg:mb-2 flex items-center">
                      Quantity:
                      <input
                        type="number"
                        value={quantity}
                        onChange={(e) => setQuantity(Number(e.target.value))}
                        min={0}
                        className="shadow appearance-none border text-center rounded w-full py-1 px-2 leading-tight focus:outline-none focus:shadow-outline ml-2"
                        style={{ minWidth: '50px' }}
                      />
                    </label>
                    <span className='mb-2 lg:mb-0 lg:ml-2'> Price: {dish.price} </span>
                  </div>
                  {quantity > 0 && (
                    <button
                      className="bg-red-500 hover:bg-red-700 text-yellow-50 font-bold py-1 px-2 rounded focus:outline-none focus:shadow-outline mt-2 lg:mt-0 w-full lg:w-auto"
                      onClick={() => addItemToOrder(dish, quantity)}
                    >
                      Add Item
                    </button>
                  )}
                </div>
                <div>
                  hi
                </div>
                 {/* // here i will add the edit dish and delete dish buttons only for session users */}
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
