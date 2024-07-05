import {
  CardNumberElement,
  CardExpiryElement,
  CardCvcElement,
  useElements,
  useStripe,
  PaymentRequestButtonElement,
} from "@stripe/react-stripe-js";
import { useEffect, useState } from "react";

const CheckoutForm = ({ amount, onSuccess, clientSecret }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [paymentRequest, setPaymentRequest] = useState(null);
  const [cardholderName, setCardholderName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");

  useEffect(() => {
    if (stripe) {
      const pr = stripe.paymentRequest({
        country: "IN",
        currency: "inr",
        total: {
          label: "Total",
          amount: amount * 100, 
        },
        requestPayerName: true,
        requestPayerEmail: true,
      });

      pr.canMakePayment().then((result) => {
        if (result) {
          setPaymentRequest(pr);
        }
      });
    }
  }, [stripe, amount]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!stripe || !elements) {
      return;
    }
    const card = elements.getElement(CardNumberElement);
    const result = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card: card,
        billing_details: {
          name: cardholderName,
          phone: phoneNumber,
        },
      },
    });

    if (result.error) {
      console.log(result.error.message);
    } else {
      onSuccess();
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-lg mx-auto bg-white p-8 rounded-lg shadow-lg">
      {paymentRequest && (
        <div className="mb-5 w-full">
          <PaymentRequestButtonElement options={{ paymentRequest }} />
        </div>
      )}
      <div className="flex items-center justify-center mb-4">
        <span className="block w-1/3 border-b border-gray-300"></span>
        <span className="text-center mx-4 text-gray-500">Or pay with card</span>
        <span className="block w-1/3 border-b border-gray-300"></span>
      </div>
      <div className="mb-4">
        <label htmlFor="cardholder-name" className="block text-gray-700 font-semibold mb-2">Cardholder Name</label>
        <input
          id="cardholder-name"
          type="text"
          value={cardholderName}
          onChange={(e) => setCardholderName(e.target.value)}
          className="p-2 border border-gray-300 rounded w-full"
          required
        />
      </div>
      <div className="mb-4">
        <label htmlFor="phone-number" className="block text-gray-700 font-semibold mb-2">Phone Number</label>
        <input
          id="phone-number"
          type="text"
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
          className="p-2 border border-gray-300 rounded w-full"
          required
        />
      </div>
      <div className="mb-4">
        <label htmlFor="card-number" className="block text-gray-700 font-semibold mb-2">Card Number</label>
        <CardNumberElement
          options={{
            style: {
              base: {
                fontSize: "16px",
                color: "#424770",
                "::placeholder": {
                  color: "#aab7c4",
                },
              },
              invalid: {
                color: "#9e2146",
              },
            },
          }}
          className="p-2 border border-gray-300 rounded"
        />
      </div>
      <div className="mb-4">
        <label htmlFor="card-expiry" className="block text-gray-700 font-semibold mb-2">Expiry Date</label>
        <CardExpiryElement
          options={{
            style: {
              base: {
                fontSize: "16px",
                color: "#424770",
                "::placeholder": {
                  color: "#aab7c4",
                },
              },
              invalid: {
                color: "#9e2146",
              },
            },
          }}
          className="p-2 border border-gray-300 rounded"
        />
      </div>
      <div className="mb-4">
        <label htmlFor="card-cvc" className="block text-gray-700 font-semibold mb-2">CVC</label>
        <CardCvcElement
          options={{
            style: {
              base: {
                fontSize: "16px",
                color: "#424770",
                "::placeholder": {
                  color: "#aab7c4",
                },
              },
              invalid: {
                color: "#9e2146",
              },
            },
          }}
          className="p-2 border border-gray-300 rounded"
        />
      </div>
      <button
        type="submit"
        disabled={!stripe}
        className="w-full py-3 bg-blue-800 hover:bg-blue-900 text-white rounded font-semibold"
      >
        Pay ₹{amount}
      </button>
    </form>
  );
};

export default CheckoutForm;
