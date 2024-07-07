"use client";
import React, { useState, useEffect, useContext } from 'react';
import { getAuth, RecaptchaVerifier, signInWithPhoneNumber } from 'firebase/auth';
import app from '@/components/config';
import { useRouter } from 'next/navigation';
import { object, string } from 'zod';
import DataContext from '@/components/datacontext';
import { saveCustomerToDB } from './savecustomertodb';

const numberSchema = object({
  formattedPhoneNumber: string()
    .min(13, { message: "Number must be 10 digits" })
    .max(13, { message: "Number must be 10 digits" })
    .regex(/^\+91\d{10}$/, { message: "Invalid Indian phone number" }),
});

const otpSchema = object({
  otp: string()
    .min(6, { message: "OTP must be 6 digits" })
    .max(6, { message: "OTP must be 6 digits" })
    .regex(/^\d{6}$/, { message: "Invalid OTP" }),
});

const LoginForCustomer = () => {
  const { phoneNumber, setPhoneNumber } = useContext(DataContext);
  const [otp, setOtp] = useState('');
  const [confirmationResult, setConfirmationResult] = useState(null);
  const [otpSent, setOtpSent] = useState(false);
  const [formattedPhoneNumber, setFormattedPhoneNumber] = useState('');
  const auth = getAuth(app);
  const router = useRouter();

  useEffect(() => {
    window.recaptchaVerifier = new RecaptchaVerifier(auth, 'recaptcha-container', {
      'size': 'invisible',
      'callback': (response) => {
        console.log('captcha resolved');
      },
      'expired-callback': () => {
        console.log('captcha expired');
      },
    });
  }, [auth]);

  const handlePhoneNumberChange = (e) => {
    setPhoneNumber(e.target.value);
  };

  const handleOtpChange = (e) => {
    setOtp(e.target.value);
  };

  const handleSendOtp = async () => {
    try {
      const formattedPhoneNumberTemp = `+91${phoneNumber.replace(/\D/g, '')}`;
      numberSchema.parse({ formattedPhoneNumber: formattedPhoneNumberTemp });
      const confirmation = await signInWithPhoneNumber(auth, formattedPhoneNumberTemp, window.recaptchaVerifier);
      setConfirmationResult(confirmation);
      setFormattedPhoneNumber(formattedPhoneNumberTemp); // Save the formatted phone number
      setOtpSent(true);
      setPhoneNumber('');
      alert('OTP sent successfully');
    } catch (error) {
      console.error(error);
      alert(error.message);
    }
  };

  const handleOtpSubmit = async () => {
    try {
      otpSchema.parse({ otp });
      await confirmationResult.confirm(otp);
      try {
        await saveCustomerToDB(formattedPhoneNumber); // Use the saved formatted phone number
        console.log('Customer saved to DB');
      } catch (error) {
        console.error(error);
        alert(error.message);
      }
      setOtp('');
      alert('OTP confirmed successfully');
      router.push('/menu');
    } catch (error) {
      console.error(error);
      alert(error.message);
    }
  };

  return (
    <div>
      {!otpSent ? (
        <div className="flex flex-col items-center">
          <input
            className="outline-none text-white bg-slate-700 rounded-md px-4 py-2 mb-4"
            type='tel'
            placeholder='Enter Phone Number'
            value={phoneNumber}
            onChange={handlePhoneNumberChange}
          />
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            onClick={handleSendOtp}
          >
            Send OTP
          </button>
          <div id='recaptcha-container'></div>
        </div>
      ) : (
        <div className="flex flex-col items-center">
          <input
            className="outline-none text-white bg-slate-700 rounded-md px-4 py-2 mb-4"
            type='text'
            placeholder='Enter OTP'
            value={otp}
            onChange={handleOtpChange}
          />
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            onClick={handleOtpSubmit}
          >
            Submit OTP
          </button>
        </div>
      )}
    </div>
  );
};

export default LoginForCustomer;
