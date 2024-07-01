"use client"
import React, { useState, useEffect, useContext } from 'react';
import Image from 'next/image';
import { getdishesfromdb } from '@/components/getdishesfromdb';
import DataContext from '@/components/datacontext';

const DishCard = ({ filteredDishes, searchQuery }) => {
  const [dishes, setDishes] = useState([]);
  const [expanded, setExpanded] = useState(false);
  const { order, setOrder } = useContext(DataContext);

  useEffect(() => {
    const fetchDishes = async () => {
      const dishesData = await getdishesfromdb();
      setDishes(dishesData);
    };

    fetchDishes();
  }, []);

  const addItemToOrder = (dish, quantity) => {
    const existingOrderItemIndex = order.findIndex(item => item.name === dish.name);
    if (existingOrderItemIndex >= 0) {
      const newOrder = [...order];
      newOrder[existingOrderItemIndex].quantity = quantity;
      setOrder(newOrder);
    } else {
      setOrder([...order, { ...dish, quantity }]);
    }
  };

  const getDishQuantity = (dish) => {
    const orderItem = order.find(item => item.name === dish.name);
    return orderItem ? orderItem.quantity : 0;
  };

  const displayedDishes = searchQuery? filteredDishes: dishes;

  return (
    <>
      {displayedDishes.length === 0 ? (
        <h1 className="text-3xl font-bungee font-bold text-center text-black">No dishes found</h1>
      ) : (
        displayedDishes.map((dish, index) => (
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
                  <div className="flex-grow gap-2">
                    <label className="text-sm font-bold mb-2 lg:mb-2 flex items-center">
                      Quantity:
                      <input
                        type="number"
                        value={getDishQuantity(dish)}
                        onChange={(e) => addItemToOrder(dish, Number(e.target.value))}
                        min={0}
                        className="shadow appearance-none border text-center rounded w-full py-1 px-2 leading-tight focus:outline-none focus:shadow-outline ml-2"
                        style={{ minWidth: '50px' }}
                      />
                    </label>
                    <span className='mb-2 lg:mb-0 lg:ml-2'> Price: ₹ {dish.price} </span>
                  </div>
                </div>
                <div className='flex justify-around w-full text-black'>
                  <button className="bg-blue-500 hover:bg-blue-700 font-bold py-1 px-2 rounded focus:outline-none focus:shadow-outline mt-2 w-full lg:w-auto">
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
