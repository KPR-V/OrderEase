"use client";
import { signOut, getAuth, onAuthStateChanged } from 'firebase/auth';
import React, { useState, useEffect } from 'react';
import { saveFeedbackToDB } from '@/components/savefeedbacktodb';
import app from "@/components/config";
import { useRouter } from 'next/navigation';
import { addnametocustomerindb } from '@/components/addnametocustomerindb';
import { getCouponFromDB } from '@/components/getcouponfromdb';

const FeedbackPage = () => {
  const [progress, setProgress] = useState(0);
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [comments, setComments] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [foodQuality, setFoodQuality] = useState('');
  const [serviceQuality, setServiceQuality] = useState('');
  const [cleanliness, setCleanliness] = useState('');
  const [value, setValue] = useState('');
  const [experience, setExperience] = useState('');
  const auth = getAuth(app);
  const router = useRouter();
  const [isVisible, setIsVisible] = useState(false);
  const [couponname, setCouponName] = useState("");
  
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (!user) {
        router.replace("/");
      }
    });
  }, [auth, router]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getCouponFromDB();
        if (data && data.length > 0) {
          console.log('Fetched Data:', data);
          setCouponName(data[0].name);
          console.log('Set coupon name:', data[0].name);
        } else {
          console.error('No data found');
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, []);

  const copyDiscountCode = () => {
    navigator.clipboard.writeText(couponname)
      .then(async () => {
        setIsVisible(false);
        try {
          await addnametocustomerindb(auth.currentUser.phoneNumber, name);
          await signOut(auth);
          setTimeout(() => {
            router.replace('/');
          }, 3000);
        } catch (error) {
          console.error('Error during sign out:', error);
        }
      })
      .catch(err => {
        console.error('Failed to copy the discount code:', err);
      });
  };

  if (isVisible) return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 text-black rounded shadow-lg text-center">
        <h2 className="text-2xl font-bold mb-4">Thank You for Visiting!</h2>
        <p className="mb-4">Here is your discount code for next time:</p>
        <button
          onClick={copyDiscountCode}
          className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
        >
          {couponname}
        </button>
      </div>
    </div>
  );

  const handleInputChange = () => {
    const totalRequiredFields = 5;
    const completedFields = document.querySelectorAll('input[required]:checked').length;
    setProgress((completedFields / totalRequiredFields) * 100);
  };

  const handleStarClick = (index) => {
    setRating(index);
  };

  const handleStarHover = (index) => {
    setHoverRating(index);
  };

  const handleStarMouseOut = () => {
    setHoverRating(0);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = {
      id: `${Math.floor(Math.random() * 1000000)}`,
      foodQuality,
      serviceQuality,
      cleanliness,
      value,
      experience,
      rating,
      comments,
      name,
      email,
    };
    setIsVisible(true);
    await saveFeedbackToDB(formData);
  };

  return (
    <>
    <link href="https://fonts.googleapis.com/css?family=Bungee+Shade" rel="stylesheet" />
      <link href="https://fonts.googleapis.com/css?family=Changa" rel="stylesheet" />

      <div className="min-h-screen flex font-changa justify-center items-center p-4">
        <div className="p-6 rounded-lg bg-slate-50/60 backdrop-blur-md shadow-lg w-full md:w-2/3 lg:w-1/2">
          <div className="mb-6 text-center">
            <h1 className="text-2xl font-bold text-green-600">Please Review Us</h1>
            <p className="text-gray-600">Please let us know how was the food and service.</p>
          </div>

          <form onSubmit={handleSubmit}>
            {[
              { label: 'Food Quality', value: foodQuality, setValue: setFoodQuality },
              { label: 'Overall Service Quality', value: serviceQuality, setValue: setServiceQuality },
              { label: 'Cleanliness', value: cleanliness, setValue: setCleanliness },
              { label: 'Value', value: value, setValue: setValue },
              { label: 'Overall Experience', value: experience, setValue: setExperience }
            ].map(({ label, value, setValue }) => (
              <div className="mb-4" key={label}>
                <label className="block text-gray-700 font-bold mb-2">
                  {label} <span className="text-red-600">*</span>
                </label>
                <div className="flex flex-wrap md:flex-nowrap gap-2 text-black">
                  {["Excellent", "Good", "Average", "Dissatisfied"].map((option) => (
                    <label key={option} className="flex items-center w-1/2 md:w-1/4">
                      <input
                        type="radio"
                        name={label.replace(' ', '').toLowerCase()}
                        value={option}
                        required
                        onChange={(e) => { setValue(e.target.value); handleInputChange(); }}
                        className="mr-2"
                      />
                      {option}
                    </label>
                  ))}
                </div>
              </div>
            ))}

            <div className="mb-4">
              <label className="block text-gray-700 font-bold mb-2">
                Please Rate Us <span className="text-red-600">*</span>
              </label>
              <div className="star-wrapper flex justify-around w-full bg-slate-500/30">
                {[1, 2, 3, 4, 5].map((index) => (
                  <div
                    key={index}
                    className={`star ${rating >= index || hoverRating >= index ? 'checked' : ''}`}
                    onClick={() => handleStarClick(index)}
                    onMouseEnter={() => handleStarHover(index)}
                    onMouseLeave={handleStarMouseOut}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                      <path d="M12 .587l3.668 10.825h11.364l-9.2 6.689 3.668 10.825-9.2-6.689-9.2 6.689 3.668-10.825-9.2-6.689h11.364z" />
                    </svg>
                  </div>
                ))}
              </div>
            </div>

            <div className="mb-4">
              <label className="block text-gray-700 font-bold mb-2">
                Any comments, questions or suggestions?
              </label>
              <textarea
                className="w-full px-3 py-2 border text-black rounded-lg"
                rows="4"
                placeholder="Your comments..."
                onChange={(e) => setComments(e.target.value)}
              ></textarea>
            </div>

            <div className="mb-4">
              <label className="block text-gray-700 font-bold mb-2">
                Name <span className="text-red-600">*</span>
              </label>
              <input
                className="w-full px-3 py-2 text-black border rounded-lg"
                type="text"
                placeholder="Your name..."
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>

            <div className="mb-4">
              <label className="block text-gray-700 font-bold mb-2">
                Email
              </label>
              <input
                className="w-full px-3 py-2 border text-black rounded-lg"
                type="email"
                placeholder="Your email..."
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div className="mb-4">
              <label className="block text-gray-700 font-bold mb-2">Progress Bar Widget</label>
              <div className="w-full bg-gray-200 rounded-full h-4">
                <div
                  className="bg-green-600 h-4 rounded-full"
                  style={{ width: `${progress}%` }}
                ></div>
              </div>
            </div>

            <div className="flex items-center justify-center">
              <button
                className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
                type="submit"
              >
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default FeedbackPage;
