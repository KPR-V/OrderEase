"use client"

import { useState } from "react";


const page = () => {

  const [tableNumber, setTableNumber] = useState("");
  const [isPopupVisible, setIsPopupVisible] = useState(false);
  const [number, setnumber] = useState("");


  const submitOrder = () => {
    setIsPopupVisible(true);
    setTimeout(() => {
      setIsPopupVisible(false);
    }, 3000);
  };
  const order = [
    {
      name: "Chole",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quaerat eligendi accusamus velit aperiam porro quod deserunt quibusdam ratione odit id exercitationem obcaecati tenetur sapiente, consequuntur delectus doloribus corrupti voluptatum nobis impedit hic animi libero sint laborum. Quaerat aspernatur distinctio reiciendis quod voluptates asperiores sapiente quidem, temporibus itaque suscipit. Adipisci, corporis.",
      price: "50",
      quantity: 1,
    },
    {
      name: "Dish Name",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dolorem nisi excepturi quis deserunt aperiam? Deserunt voluptatibus commodi necessitatibus nesciunt neque, delectus nemo reiciendis enim magni aut fuga rerum unde error praesentium dolores illo veniam dolore.",
      price: "500",
      quantity: 5,
    },
    {
      name: "Dish Name 1",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dolorem nisi excepturi quis deserunt aperiam? Deserunt voluptatibus commodi necessitatibus nesciunt neque, delectus nemo reiciendis enim magni aut fuga rerum unde error praesentium dolores illo veniam dolore.lorem ipsum dolor sit amet, consectetur ",
      price: "5050",
      quantity: 10,
    },
  ];


  return (
    <>
      <div className="w-full h-full flex justify-center items-center flex-col font-changa">
        <div className="w-full md:w-2/3 h-full flex justify-center items-center bg-slate-900/50 backdrop-blur-sm flex-col font-changa">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-yellow-400 font-changa my-4 text-center">
            Confirm Your Order
          </h1>
          <ul className="bg-orange-500 w-full md:w-2/3 p-4 md:p-5 min-h-24 max-h-96 rounded-lg shadow-lg space-y-3 md:space-y-4 overflow-y-overlay overflow-x-hidden">
            {order.map((item, index) => (
              <li
                key={index}
                className="text-base md:text-lg lg:text-xl text-black flex font-bold justify-between items-center my-2 md:my-3"
              >
                <span>
                  {item.quantity} x {item.name} (${item.price})
                </span>
                <span> ${item.quantity * item.price}</span>
              </li>
            ))}
            <h2 className="text-lg md:text-xl lg:text-2xl font-extrabold flex justify-between items-center mt-3 md:mt-5">
              <span>Total:</span>
              <span>
                ${order.reduce((acc, item) => acc + item.quantity * item.price, 0)}{" "}
              </span>
            </h2>
          </ul>
          <div className="flex flex-col justify-center items-center w-full text-amber-400 mt-4 md:mt-6">
            <div className="flex flex-col justify-center items-center w-full">
              <label htmlFor="tableNumber" className="text-base md:text-lg lg:text-xl font-bungee text-amber-400 font-extrabold mb-2 md:mb-3">
                Table Number:
              </label>
              <input
                id="tableNumber"
                type="number"
                className="border-2 w-full md:w-2/3 bg-transparent border-black text-base md:text-lg lg:text-xl text-center outline-none rounded-md px-3 py-2 my-2 md:my-3"
                placeholder="Table Number"
                required
                value={tableNumber}
                onChange={(e) => setTableNumber(e.target.value)}
              />
            </div>
            <div className="flex flex-col justify-center items-center w-full">
              <label htmlFor="phoneNumber" className="text-base md:text-lg lg:text-xl font-bungee text-amber-400 font-extrabold mb-2 md:mb-3">
                Phone Number:
              </label>
              <input
                id="phoneNumber"
                type="tel"
                className="border-2 w-full md:w-2/3 bg-transparent border-black text-base md:text-lg lg:text-xl text-center outline-none rounded-md px-3 py-2 my-2 md:my-3"
                placeholder="Phone Number"
                required
                value={number}
                onChange={(e) => setnumber(e.target.value)}
              />
            </div>
          </div>
          <button
            type="button"
            onClick={submitOrder}
            className="text-base md:text-lg lg:text-xl text-black outline-none bg-orange-500 hover:bg-orange-600 focus:ring-4 focus:outline-none rounded-lg px-5 py-2.5 mt-4 md:mt-6"
          >
            Submit Your Order
          </button>
        </div>
      </div>
      {isPopupVisible && (
        <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-4 md:p-5 gap-2 md:gap-3 rounded flex-col shadow-lg flex items-center space-x-3 md:space-x-4">
            <img src="/icons8-correct.gif" alt="done" className="w-20 h-20 md:w-28 md:h-28" />
            <span className="text-base md:text-lg lg:text-xl">Your order has been confirmed</span>
          </div>
        </div>
      )}
    </>
  );
};


export default page;
