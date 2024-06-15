"use client";
import React, { useState } from 'react';
import { Eye, EyeOff } from "lucide-react";
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import axios from 'axios';
const page = () => {
  const router = useRouter();
  const [formData, setFormData] = useState({
    username: '',
    name: '',
    email: '',
    password: ''
  });
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:3500/register', formData,{withCredentials: true});// {withCredentials: true} use it when you want to send cookie back to backend
      if (response.status === 200) {
        localStorage.setItem('token', response.data.token);
        router.push("/admin-dashboard")
      }
    } catch (error) {
      console.error('Error:', error);
    }finally{
      setFormData({
        username: '',
        name: '',
        email: '',
        password: ''
      });
    }
  };
  const [show, setshow] = useState(false);
  const handleClick = () => setshow(!show);
  return (
    <div className="bg-home bg-cover bg-center bg-gray-800 bg-opacity-50 w-full h-full flex justify-center items-center flex-col text-white ">
      <div className='flex flex-col justify-evenly gap-9 items-center backdrop-blur-sm p-5 border-solid border-3 border-black rounded-md w-full lg:w-2/3'>
        <h3 className="text-3xl sm:text-3xl mb-3 font-extrabold text-black font-bungee">Create Account</h3>
        <form className="flex flex-col gap-3 justify-center font-bungee" onSubmit={handleSubmit}>
          <input
            className="px-3 text-center py-2 rounded-md bg-transparent outline-none border-3 bg-zinc-800"
            type="text"
            placeholder="username"
            name="username"
            value={formData.username}
            onChange={handleChange}
          />
          <input
            className="px-3 text-center py-2 rounded-md bg-transparent outline-none border-3 bg-zinc-800"
            type="text"
            placeholder="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
          />
          <input
            className="px-3 text-center py-2 rounded-md bg-transparent outline-none border-3 bg-zinc-800"
            type="email"
            placeholder="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
          />
          <div className='flex justify-center items-center mr-4'>
            <input
              className="px-3 text-center py-2 rounded-md bg-transparent outline-none border-3 bg-zinc-800"
              type={show ? "text" : "password"}
              placeholder="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
            />
            <div className='-ml-10 cursor-pointer'>
              {show ? <Eye onClick={handleClick} /> : <EyeOff onClick={handleClick} />}
            </div>
          </div>
          <input
            className="px-5 text-sm sm:text-lg md:text-lg lg:text-xl xl:text-2xl py-2 rounded-md bg-blue-500 text-black"
            type="submit"
            value="Create Account"
          />
        </form>
        <div>
          <Link href="/login">
            <button type='submit' className='text-sm sm:text-xl md:text-lg lg:text-xl xl:text-2xl font-bungee cursor-pointer rounded-md border-3 text-black bg-orange-500 py-2 px-3 outline-none'>
              Already have an account?
            </button>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default page;