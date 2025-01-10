/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react'
import { useSelector } from 'react-redux';

export default function Profile() {
  const currentUser = useSelector(
    (state: any) => state.user && state.user.user.currentUser
  );

  return (
    <div className='max-w-screen-xl mx-auto px-4 sm:px-6 flex flex-col justify-start'>
      <div className="flex justify-between items-center py-4">
          
          <div className="">
              <img src={currentUser.user?.userprofile} alt="Profile" className="w-28 h-28 rounded-full" />
          </div>

          <div className="flex flex-col justify-center cursor-pointer text-red-700">
            <h2>Sing out</h2>
          </div>
      </div>
      <div className="flex flex-col justify-center">
        <div className="text-2xl font-bold">
          {currentUser.user?.username}
        </div>
        <div className="text-xl text-slate-600 font-normal">
          {currentUser.user?.email}
        </div>
      </div>
    </div>
  )
}
