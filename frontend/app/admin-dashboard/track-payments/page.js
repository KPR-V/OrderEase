// app/page.js
"use client"
import React, { useState } from 'react';
import EarningsGraph from '@/components/earninggraph'
import { transactions, earnings } from '@/components/sampledataforpaymentspage';

const Page = () => {
  const [showTransactions, setShowTransactions] = useState(false);
  const [viewWeek, setViewWeek] = useState(true);

  const formatDateToMonth = date => date.slice(0, 7);
  const today = new Date().toISOString().slice(0, 10);

  const todaysTransactions = transactions.filter(transaction => transaction.date === today);

  const aggregateEarnings = viewWeek
    ? earnings.reduce((acc, earning) => {
        acc[earning.date] = (acc[earning.date] || 0) + earning.amount;
        return acc;
      }, {})
    : earnings.reduce((acc, earning) => {
        const month = formatDateToMonth(earning.date);
        acc[month] = (acc[month] || 0) + earning.amount;
        return acc;
      }, {});

  const totalEarnings = earnings.reduce((acc, cur) => acc + cur.amount, 0);

  const handleToggleTransactions = () => {
    setShowTransactions(!showTransactions);
  };

  const handleToggleView = () => {
    setViewWeek(!viewWeek);
  };

  return (
    <>
      <link href="https://fonts.googleapis.com/css?family=Bungee+Shade" rel="stylesheet" />
      <link href="https://fonts.googleapis.com/css?family=Changa" rel="stylesheet" />
      <div className="w-full flex justify-center items-center flex-col text-white scrollbar-custom">
        <div className="flex flex-col justify-around gap-7 mt-1.5 items-center bg-slate-50/60 backdrop-blur-md p-5 border-solid border-3 border-black scrollbar-custom rounded-md w-full md:w-2/3 sm:backdrop-blur-sm">
          <h1 className="text-3xl mb-3 text-black font-extrabold font-bungee text-center">Payments</h1>
          <div className="w-11/12 max-w-4xl scrollbar-custom p-3 border bg-zinc-700 border-zinc-800">
            <div className="grid grid-cols-3 font-changa gap-4 text-center mb-6">
              <div className="border flex flex-col justify-evenly border-yellow-400 p-4">
                <h2 className="text-2xl font-changa mb-4">Total Money Earned Till Date</h2>
                <p className="text-xl text-green-500">₹ {totalEarnings}</p>
              </div>
              <div className="border flex flex-col justify-around border-yellow-400 p-4">
                <h2 className="text-2xl font-changa mb-4">Money Earned Per {viewWeek ? "Day" : "Month"}</h2>
                <div className="text-left">
                  {Object.entries(aggregateEarnings).map(([date, totalAmount], index) => (
                    <div key={`${date}-${index}`} className="mb-2 flex justify-around font-semibold">
                      <span>{date}: </span> <span className='text-green-500'> ₹ {totalAmount}</span>
                    </div>
                  ))}
                </div>
                <button
                  className="mt-4 px-4 text-blue-500 py-2"
                  onClick={handleToggleView}
                >
                  {viewWeek ? 'Show Monthly Earnings' : 'Show Weekly Earnings'}
                </button>
              </div>
              <div className="border border-yellow-400 p-4">
                <h2 className="text-2xl mb-4">Bar Graph of Earnings</h2>
                <EarningsGraph data={aggregateEarnings} />
                <button
                  className="mt-4 px-4 text-blue-500 py-2 "
                  onClick={handleToggleView}
                >
                  {viewWeek ? 'View Monthly' : 'View Weekly'}
                </button>
              </div>
            </div>
            <div className="border font-changa border-yellow-400 p-4 text-center">
              <h2 className="text-2xl mb-4">Today's Transactions</h2>
              <div className="max-h-32 overflow-y-auto scroll-smooth scrollbar-custom">
                {todaysTransactions.map((transaction, index) => (
                  <div key={`${transaction.id}-${index}`} className="mb-2 flex justify-around font-semibold">
                    <span>{transaction.date}: </span> <span className='text-green-500'> ₹ {transaction.amount}</span>
                  </div>
                ))}
              </div>
              <button
                className="mt-4 px-4 text-blue-500 font-semibold py-2 "
                onClick={handleToggleTransactions}
              >
                {showTransactions ? 'Hide Transactions' : 'Show All Transactions'}
              </button>
              {showTransactions && (
                <div className="mt-4 text-left max-h-64 overflow-y-auto scroll-smooth scrollbar-custom">
                  {transactions.map((transaction, index) => (
                    <div key={`${transaction.id}-${index}`} className="mb-2 flex justify-around font-semibold">
                      <span>{transaction.date}: </span> <span className='text-green-500'> ₹ {transaction.amount}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  )
};

export default Page;
