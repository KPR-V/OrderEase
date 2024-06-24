"use client"
import Image from 'next/image'
import { useState } from "react";

const DishCard = ({ dish }) => {
  const [quantity, setQuantity] = useState(0);
  const [expanded, setExpanded] = useState(false);
  const [order, setOrder] = useState([]);

  const addItemToOrder = (dish, quantity) => {
    setOrder([...order, { ...dish, quantity }]);
  };

  return (
    <>
      <div className={`w-full min-h-[320px] flex flex-col lg:flex-row gap-3 text-black font-extrabold rounded-lg bg-slate-50 transition-all duration-300 ${expanded ? 'h-auto overflow-y-scroll max-h-96 no-scrollbar' : 'h-64 overflow-y-scroll'}`}>
        <div className={`w-full lg:w-1/2 flex-shrink-0 ${expanded ? 'h-64 lg:h-96' : 'h-48 lg:h-full'}`}>
          <Image
            src="https://imgs.search.brave.com/k_YPD0g3bKe7HDuYuHKynWHl1kqqNi3drXEnGaF0SjA/rs:fit:860:0:0/g:ce/aHR0cHM6Ly9pbWFn/ZXMudW5zcGxhc2gu/Y29tL3Bob3RvLTE1/NTk4NDc4NDQtNTMx/NTY5NWRhZGFlP3E9/ODAmdz0xMDAwJmF1/dG89Zm9ybWF0JmZp/dD1jcm9wJml4bGli/PXJiLTQuMC4zJml4/aWQ9TTN3eE1qQTNm/REI4TUh4elpXRnlZ/Mmg4TVRCOGZHUmxi/R2xqYVc5MWN5VXlN/R1p2YjJSOFpXNThN/SHg4TUh4OGZEQT0"
            width={320}
            height={320}
            alt='dish image'
            priority = {true}
            className={`w-full h-full object-fit rounded-t-lg lg:rounded-none lg:rounded-l-lg transition-all duration-300 ${expanded ? 'lg:h-64' : ''}`}
          />
        </div>
        <div className={`flex flex-col items-center justify-between w-full lg:w-1/2 p-4 ${expanded ? 'gap-4 pb-2' : ''}`}>
          <div className='flex flex-col items-center text-center'>
            <h2 className="font-bold text-xl mb-2 text-black">{dish.name}</h2>
            <p className={`text-sm tracking-tighter  ${expanded ? '' : 'line-clamp-2'}`}>
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
              <span className='mb-2 lg:mb-0 lg:ml-2'> Price: "${dish.price}" </span>
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
        @media (min-width: 1024px) {
          .lg:h-64 {
            height: 64px;
          }
        }
          @media (max-width: 320px) {
          .lg:h-64 {
            height: auto;
          }
        }
      `}</style>
    </>
  );
};

export default DishCard;