"use client";
import React, { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';

const passwordfield = () => {
    const [show, setshow] = useState(false);
    const handleClick = () => setshow(!show);
  return (
    <div className='flex justify-center items-center mr-4'>
            <input className="px-3 text-center py-2 rounded-md bg-transparent outline-none border-3 bg-zinc-800" type={show ? "text" : "password"} placeholder="password" name="password" />
            <div className='-ml-10 cursor-pointer'>
              {show ? <Eye onClick={handleClick} /> : <EyeOff onClick={handleClick} />}
            </div>
          </div>
  )
}

export default passwordfield
