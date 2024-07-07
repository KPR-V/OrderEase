"use client";
import { signOut, getAuth } from 'firebase/auth';
import React, { useState, useContext } from 'react';
import DataContext from '@/components/datacontext';
import { saveFeedbackToDB } from '@/components/savefeedbacktodb';
import app from "@/components/config"
import { useRouter } from 'next/navigation';
const FeedbackPage = () => {

  const [progress, setProgress] = useState(0);
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const { foodQuality, setFoodQuality, serviceQuality, setServiceQuality, cleanliness, setCleanliness, value, setValue, experience, setExperience, comments, setComments, name, setName, email, setEmail } = useContext(DataContext);
  const [submittedData, setSubmittedData] = useState(null);
  const auth = getAuth(app);
  const router = useRouter();
  const [isVisible, setIsVisible] = useState(false);


  const copyDiscountCode = () => {
    const discountCode = "DISCOUNT2024";
    navigator.clipboard.writeText(discountCode)
      .then( async () => {
        setIsVisible(false);
        // activate it when ready 

        // try{
        //  await signOut(auth)
        //     router.replace('/')
        // }
        // catch (error) {
        //   console.error('', error);
        // } 
      })
      .catch(err => {
        console.error("Failed to copy the discount code: ", err);
      });
  };
  if (isVisible) return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded shadow-lg text-center">
        <h2 className="text-2xl font-bold mb-4">Thank You for Visiting!</h2>
        <p className="mb-4">Here is your discount code for next time:</p>
        <button
          onClick={copyDiscountCode}
          className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
        >
          DISCOUNT2024
        </button>
      </div>
    </div>

  )


    ;
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
      id: `${name + Math.floor(Math.random() * 1000)}`,
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
    setSubmittedData(formData);
    setIsVisible(true);
    await saveFeedbackToDB(submittedData);

  };

  return (
    <>
      <link href="https://fonts.googleapis.com/css?family=Bungee+Shade" rel="stylesheet" />
      <link href="https://fonts.googleapis.com/css?family=Changa" rel="stylesheet" />

      <div className="min-h-screen flex font-changa justify-center items-center">
        <div className="p-6 rounded-lg bg-slate-50/60 backdrop-blur-md shadow-lg w-full md:w-2/3 lg:w-1/2">
          <div className="mb-6">
            <h1 className="text-2xl font-bold text-green-600">Please Review Us</h1>
            <p className="text-gray-600">Please let us know how was the food and service.</p>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="block text-gray-700 font-bold mb-2">
                Food Quality <span className="text-red-600">*</span>
              </label>
              <div className="flex space-x-4">
                {["Excellent", "Good", "Average", "Dissatisfied"].map((option) => (
                  <label key={option} className="flex items-center justify-evenly w-full font-bold">
                    <input
                      type="radio"
                      name="foodQuality"
                      value={option}
                      required
                      onChange={(e) => { setFoodQuality(e.target.value); handleInputChange(); }}
                      className="mr-2"
                    />
                    {option}
                  </label>
                ))}
              </div>
            </div>

            <div className="mb-4">
              <label className="block text-gray-700 font-bold mb-2">
                Overall Service Quality <span className="text-red-600">*</span>
              </label>
              <div className="flex space-x-4">
                {["Excellent", "Good", "Average", "Dissatisfied"].map((option) => (
                  <label key={option} className="flex items-center justify-evenly w-full font-bold">
                    <input
                      type="radio"
                      name="serviceQuality"
                      value={option}
                      required
                      onChange={(e) => { setServiceQuality(e.target.value); handleInputChange(); }}
                      className="mr-2"
                    />
                    {option}
                  </label>
                ))}
              </div>
            </div>

            <div className="mb-4">
              <label className="block text-gray-700 font-bold mb-2">
                Cleanliness <span className="text-red-600">*</span>
              </label>
              <div className="flex space-x-4">
                {["Excellent", "Good", "Average", "Dissatisfied"].map((option) => (
                  <label key={option} className="flex items-center justify-evenly w-full font-bold">
                    <input
                      type="radio"
                      name="cleanliness"
                      value={option}
                      required
                      onChange={(e) => { setCleanliness(e.target.value); handleInputChange(); }}
                      className="mr-2"
                    />
                    {option}
                  </label>
                ))}
              </div>
            </div>

            <div className="mb-4">
              <label className="block text-gray-700 font-bold mb-2">
                Value <span className="text-red-600">*</span>
              </label>
              <div className="flex space-x-4">
                {["Excellent", "Good", "Average", "Dissatisfied"].map((option) => (
                  <label key={option} className="flex items-center justify-evenly w-full font-bold">
                    <input
                      type="radio"
                      name="value"
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

            <div className="mb-4">
              <label className="block text-gray-700 font-bold mb-2">
                Overall Experience <span className="text-red-600">*</span>
              </label>
              <div className="flex space-x-4">
                {["Excellent", "Good", "Average", "Dissatisfied"].map((option) => (
                  <label key={option} className="flex items-center justify-evenly w-full font-bold">
                    <input
                      type="radio"
                      name="experience"
                      value={option}
                      required
                      onChange={(e) => { setExperience(e.target.value); handleInputChange(); }}
                      className="mr-2"
                    />
                    {option}
                  </label>
                ))}
              </div>
            </div>

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
                className="w-full px-3 py-2 border rounded-lg"
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
                className="w-full px-3 py-2 border rounded-lg"
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
                className="w-full px-3 py-2 border rounded-lg"
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
