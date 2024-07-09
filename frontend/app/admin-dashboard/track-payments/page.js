"use client";
import React, { useState, useEffect } from 'react';
import EarningsGraph from '@/components/earninggraph';
import Image from 'next/image';
import Link from 'next/link';

const convertToIST = (dateString) => {
  const date = new Date(dateString);
  
  const offset = 5.5 * 60 * 60 * 1000;
  const istDate = new Date(date.getTime() + offset);
  return istDate.toISOString();
};

const Page = () => {
  const [showTransactions, setShowTransactions] = useState(false);
  const [viewWeek, setViewWeek] = useState(true);
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const response = await fetch('/api/transactions');
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        
        const transactionsWithIST = data.map(transaction => ({
          ...transaction,
          created: convertToIST(transaction.created)
        }));
        setTransactions(transactionsWithIST);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching transactions:', error);
        setLoading(false);
      }
    };

    fetchTransactions();
  }, []);
  if(loading){
    return <div className="flex justify-center items-center h-screen w-full"><Image src="/loading.gif" width={100} height={100} alt="loading" /></div>
  }
 

  
  const todayISOString = new Date().toISOString();
  const today = convertToIST(todayISOString).slice(0, 10); 
  

  
  const todaysTransactions = transactions.filter(transaction => transaction.created.slice(0, 10) === today);

  const formatDateToMonth = date => date.slice(0, 7);

  const aggregateEarnings = viewWeek
    ? transactions.reduce((acc, transaction) => {
      acc[transaction.created.slice(0, 10)] = (acc[transaction.created.slice(0, 10)] || 0) + transaction.amount;
      return acc;
    }, {})
    : transactions.reduce((acc, transaction) => {
      const month = formatDateToMonth(transaction.created);
      acc[month] = (acc[month] || 0) + transaction.amount;
      return acc;
    }, {});

  const totalEarnings = transactions.reduce((acc, cur) => acc + cur.amount, 0);

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
        <div className="flex flex-col justify-around gap-7 mt-1.5 items-center bg-slate-50/60 backdrop-blur-md p-4 border-solid border-3 border-black scrollbar-custom rounded-md w-full md:w-5/6 lg:w-5/6 xl:w-3/4 2xl:w-2/3 sm:backdrop-blur-sm">
          <h1 className="text-2xl md:text-3xl mb-3 text-black font-extrabold font-bungee text-center">Payments</h1>
          <div className="w-full scrollbar-custom p-3 border bg-zinc-700 border-zinc-800">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 font-changa gap-4 text-center mb-6">
              <div className="border flex flex-col justify-evenly border-yellow-400 p-4">
                <h2 className="text-xl md:text-2xl font-changa mb-4">Total Money Earned Till Date</h2>
                <p className="text-lg md:text-xl text-green-500">₹ {totalEarnings / 100}</p>
              </div>
              <div className="border flex flex-col justify-around border-yellow-400 p-4">
                <h2 className="text-xl md:text-2xl font-changa mb-4">Money Earned Per {viewWeek ? "Day" : "Month"}</h2>
                <div className="text-left overflow-y-auto scrollbar-custom max-h-32 lg:max-h-40 xl:max-h-48 2xl:max-h-56">
                  {Object.entries(aggregateEarnings).map(([date, totalAmount], index) => (
                    <div key={`${date}-${index}`} className="mb-2 flex justify-between font-semibold">
                      <span>{date}: </span> <span className='text-green-500'>₹ {totalAmount / 100}</span>
                    </div>
                  ))}
                </div>
                <button className="mt-4 px-4 text-blue-500 py-2" onClick={handleToggleView}>
                  {viewWeek ? 'Show Monthly Earnings' : 'Show Weekly Earnings'}
                </button>
              </div>
              <div className="border flex flex-col justify-between border-yellow-400 p-4">
                <h2 className="text-xl md:text-2xl mb-4">Bar Graph of Earnings</h2>
                <EarningsGraph data={aggregateEarnings} />
                <button className="mt-4 px-4 text-blue-500 py-2" onClick={handleToggleView}>
                  {viewWeek ? 'View Monthly' : 'View Weekly'}
                </button>
              </div>
            </div>
            <div className="border font-changa border-yellow-400 p-4 text-center">
              <h2 className="text-xl md:text-2xl mb-4">Today's Transactions</h2>
              <div className="max-h-32 overflow-y-auto scrollbar-custom">
                {todaysTransactions.map((transaction, index) => (
                  <div key={`${transaction.id}-${index}`} className="mb-2 flex justify-around font-semibold">
                    <span>{transaction.created.slice(11, 19)}</span>
                    <span>{transaction.billing_name.toUpperCase()}</span>
                    <span>{transaction.billing_phone}</span>
                    <span>{transaction.status}</span>
                    <span className='text-green-500'>₹ {transaction.amount / 100}</span>
                  </div>
                ))}
              </div>
              <button className="mt-4 px-4 text-blue-500 font-semibold py-2" onClick={handleToggleTransactions}>
                {showTransactions ? 'Hide Transactions' : 'Show All Transactions'}
              </button>
              {showTransactions && (
                <div className="mt-4 text-left max-h-64 overflow-y-auto scrollbar-custom">
                  {transactions.map((transaction, index) => (
                    <div key={`${transaction.id}-${index}`} className="mb-2 flex justify-around font-semibold">
                      <span>{transaction.created.slice(11, 19)}</span>
                      <span>{transaction.billing_name.toUpperCase()}</span>
                      <span>{transaction.billing_phone ? transaction.billing_phone : 'not given'}</span>
                      <span>{transaction.status}</span>
                      <span className='text-green-500'>₹ {transaction.amount / 100}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
          <Link href="/admin-dashboard">
            <button type="button" className="bg-custom-yellow text-black font-bold py-2 px-4 rounded-md">
              Go Back To Admin Dashboard
            </button>
          </Link>
        </div>
      </div>
    </>
  );
};

export default Page;
