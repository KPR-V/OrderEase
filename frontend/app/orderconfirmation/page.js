"use client";
import { useState, useEffect, useContext, useMemo } from "react";
import Link from "next/link";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import app from "@/components/config";
import { useRouter } from "next/navigation";
import { getCouponFromDB } from "@/components/getcouponfromdb";
import { saveordereddishestodb } from "@/components/saveordereddishestodb";
import DataContext from "@/components/datacontext";
import { object, z } from "zod";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "@/components/Checkout";
import Modal from "@/components/Modal";
import { saveordersToDB } from "@/components/saveorderstodb";
import { savestatustoorders } from "@/components/savestatustodb";

const Page = () => {
  const [isPaymentPopupVisible, setIsPaymentPopupVisible] = useState(false);
  const [isOrderConfirmed, setIsOrderConfirmed] = useState(false);
  const [clientSecret, setClientSecret] = useState("");
  const { order, setOrder, tableNumber, setTableNumber, instructions, setInstructions } = useContext(DataContext);
  const [couponcode, setCouponcode] = useState("");
  const [coupons, setCoupons] = useState([]);
  const [discountedAmount, setDiscountedAmount] = useState(0);
  const auth = getAuth(app);
  const router = useRouter();

  const schema = object({
    tableNumber: z.string().min(1, "Table number is required").max(3, "Table number is too long"),
  });

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (!user) {
        router.replace("/");
      }
    });
  }, [auth, router]);

  useEffect(() => {
    const getCoupon = async () => {
      try {
        const coupons = await getCouponFromDB();
        setCoupons(coupons);
        console.log(coupons);
      } catch (error) {
        console.error("Error getting coupon from DB:", error);
      }
    };
    getCoupon();
  }, []);

  const stripePromise = useMemo(() => loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY), []);
  const amount = order.reduce((acc, item) => acc + item.quantity * item.price, 0);

  const ids = order.map((item) => item._id);

  const validateCoupon = () => {
    const coupon = coupons.find(c => c.name === couponcode);
    if (coupon) {
      const discount = (amount * coupon.discount) / 100;
      setDiscountedAmount(amount - discount);
    } else {
      setDiscountedAmount(amount); 
    }
  };

  useEffect(() => {
    validateCoupon();
  }, [couponcode, amount, coupons]);

  const handlePaymentSuccess = async () => {
    setIsOrderConfirmed(true);
    await saveordersToDB({ tableNumber, order, instructions });
    await saveordereddishestodb(auth.currentUser.phoneNumber, ids);
    try {
      await savestatustoorders();
    } catch (error) {
      console.error('Error saving status to orders:', error);
    }
    setTimeout(() => {
      setIsOrderConfirmed(false);
      router.replace(`/trackorder?tableNumber=${tableNumber}&amount=${discountedAmount}`);
      setOrder([]);
      setTableNumber("");
      setInstructions("");
    }, 3000);
  };

  const submitOrder = async () => {
    try {
      schema.parse({ tableNumber: tableNumber.toString() });

      const response = await fetch("/api/create-payment-intent", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ amount: discountedAmount * 100 }),
      });

      const { clientSecret } = await response.json();
      setClientSecret(clientSecret);
      setIsPaymentPopupVisible(true);
    } catch (error) {
      console.log(error.errors || error.message);
      return;
    }
  };

  const isOrderEmpty = order.length === 0 || order.every((item) => item.quantity === 0);

  return (
    <div className="w-full h-full flex justify-center items-center flex-col font-changa">
      <div className="w-full md:w-2/3 h-full flex justify-center items-center bg-slate-900/50 backdrop-blur-sm flex-col font-changa">
        {isOrderEmpty ? (
          <>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-yellow-400 my-4 text-center">
              Your Order is Empty
            </h1>
            <Link href="/menu">
              <button className="text-base md:text-lg lg:text-xl text-black bg-orange-500 hover:bg-orange-600 focus:ring-4 focus:outline-none rounded-lg px-5 py-2.5 mt-4 md:mt-6">
                Go Back
              </button>
            </Link>
          </>
        ) : (
          <>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-yellow-400 my-4 text-center">
              Confirm Your Order
            </h1>
            <ul className="bg-orange-500 scrollbar-custom w-full md:w-2/3 p-4 md:p-5 min-h-24 max-h-96 rounded-lg shadow-lg space-y-3 md:space-y-4 overflow-y-overlay overflow-x-hidden">
              {order.map((item, index) => (
                <li
                  key={index}
                  className="text-base md:text-lg lg:text-xl text-black flex font-bold justify-between items-center my-2 md:my-3"
                >
                  <span>
                    {item.quantity} x {item.name} (₹{item.price})
                  </span>
                  <span> ₹{item.quantity * item.price}</span>
                </li>
              ))}
              <h2 className="text-lg md:text-xl lg:text-2xl font-extrabold flex text-black justify-between items-center mt-3 md:mt-5">
                <span>Total:</span>
                <span>₹{amount}</span>
              </h2>
              {discountedAmount < amount && (
                <>
                  <h2 className="text-base md:text-lg lg:text-xl text-black flex font-bold justify-between items-center my-2 md:my-3">
                    <span>Discount ({couponcode}):</span>
                    <span>-₹{amount - discountedAmount}</span>
                  </h2>
                  <h2 className="text-lg md:text-xl lg:text-2xl font-extrabold text-black flex justify-between items-center mt-3 md:mt-5">
                    <span>Total after discount:</span>
                    <span>₹{discountedAmount}</span>
                  </h2>
                </>
              )}
            </ul>
            <div className="flex flex-col justify-center items-center w-full text-amber-400 mt-4 md:mt-6">
              <div className="flex flex-col justify-center items-center w-full">
                <label htmlFor="tableNumber" className="text-sm md:text-base lg:text-lg font-bungee text-amber-400 font-extrabold mb-1 md:mb-2">
                  Table Number:
                </label>
                <input
                  id="tableNumber"
                  type="number"
                  className="border-2 w-full md:w-2/3 bg-transparent border-black text-sm md:text-base lg:text-lg text-center outline-none rounded-md px-2 py-1 my-1 md:my-2"
                  placeholder="Table Number"
                  required
                  value={tableNumber}
                  onChange={(e) => setTableNumber(e.target.value)}
                />
              </div>
              <div className="flex flex-col justify-center items-center w-full">
                <label htmlFor="couponcode" className="text-sm md:text-base lg:text-lg font-bungee text-amber-400 font-extrabold mb-1 md:mb-2">
                  Coupon Code:
                </label>
                <input
                  id="couponcode"
                  type="text"
                  className="border-2 w-full md:w-2/3 bg-transparent border-black text-sm md:text-base lg:text-lg text-center outline-none rounded-md px-2 py-1 my-1 md:my-2"
                  placeholder="Coupon Code (if any)"
                  value={couponcode}
                  onChange={(e) => setCouponcode(e.target.value)}
                />
              </div>
              <div className="flex flex-col justify-center items-center w-full">
                <label htmlFor="instructions" className="text-sm md:text-base lg:text-lg font-bungee text-amber-400 font-extrabold mb-1 md:mb-2">
                  Special Instructions:
                </label>
                <input
                  id="instructions"
                  type="text"
                  className="border-2 w-full md:w-2/3 bg-transparent border-black text-sm md:text-base lg:text-lg text-center outline-none rounded-md px-2 py-1 my-1 md:my-2"
                  placeholder="(if any)"
                  value={instructions}
                  onChange={(e) => setInstructions(e.target.value)}
                />
              </div>
            </div>
            <button
              type="button"
              className="text-base md:text-lg lg:text-xl text-black bg-orange-500 hover:bg-orange-600 focus:ring-4 focus:outline-none rounded-lg px-5 py-2.5 mt-4 md:mt-6"
              onClick={submitOrder}
            >
              Proceed to Payment
            </button>
            <Link href="/menu">
              <button className="text-base md:text-lg lg:text-xl text-black bg-orange-500 hover:bg-orange-600 focus:ring-4 focus:outline-none rounded-lg px-5 py-2.5 mt-4 md:mt-6">
                Go Back
              </button>
            </Link>
          </>
        )}
      </div>

      {isPaymentPopupVisible && clientSecret && (
        <Modal isOpen={isPaymentPopupVisible} onClose={() => setIsPaymentPopupVisible(false)}>
          <Elements stripe={stripePromise}>
            <CheckoutForm
              amount={discountedAmount}
              clientSecret={clientSecret}
              onSuccess={handlePaymentSuccess}
            />
          </Elements>
        </Modal>
      )}

      {isOrderConfirmed && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-2xl font-bold mb-4">Order Confirmed!</h2>
            <p className="text-lg">Redirecting to order tracking...</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Page;
