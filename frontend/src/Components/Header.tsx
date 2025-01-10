/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react'
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

export default function Header() {

  const currentUser = useSelector(
    (state: any) => state.user && state.user.user.currentUser
  );

  return (
    <div className='max-w-screen-xl mx-auto px-4 sm:px-6 flex items-center justify-between py-4 border-b-2 border-gray-100 shadow-sm'>
      <div className="text-2xl font-bold">
        Influencer <span className="text-blue-500">View</span>
      </div>

       {/* adding profile image */}
       <div className="flex items-center cursor-pointer">
        {
          currentUser ?
            <Link to="/profile">
                <img src={currentUser.user.userprofile} alt="Profile" className="w-10 h-10 rounded-full" />
            </Link>
            :
            <div>
              <Link to="/signin">
              <span className="text-sm font-bold">Sign In</span>
              </Link>
            </div>
        }
      </div>
    </div>
  )
}
