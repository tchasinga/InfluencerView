/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { signOutUserFailure, signOutUserStart, signOutUserSuccess } from '../redux/user/userSlice';

export default function Profile() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Adding sign out functionality (this function is used to sign out the user)
  const handleSignOut = async () => {
    try {
      dispatch(signOutUserStart());
      const res = await fetch('http://localhost:8000/apis/auth/logout');
      const data = await res.json();

      if (data.success === false) {
        dispatch(signOutUserFailure(data.message));
        return;
      }
      dispatch(signOutUserSuccess(data));
      navigate('/signin');
    } catch (error) {
      console.error(error);
      if (error instanceof Error) {
        dispatch(signOutUserFailure(error.message));
      } else {
        dispatch(signOutUserFailure('An unknown error occurred'));
      }
    }
  };

  const currentUser = useSelector(
    (state: any) => state.user && state.user.user.currentUser
  );

  return (
    <div className='max-w-screen-xl mx-auto px-4 sm:px-6 flex flex-col justify-start'>
      <div className="flex justify-between items-center py-4">
        <div className="">
          <img src={currentUser?.user?.userprofile} alt="Profile" className="w-28 h-28 rounded-full" />
        </div>

        <div className="flex flex-col justify-center cursor-pointer text-red-700" onClick={handleSignOut}>
          <h2>Sign out</h2>
        </div>
      </div>
      <div className="flex flex-col justify-center">
        <div className="text-2xl font-bold">
          {currentUser?.user?.username}
        </div>
        <div className="text-xl text-slate-600 font-normal">
          {currentUser?.user?.email}
        </div>
      </div>
      {/* adding a creating post */}
      <Link to="/createpost">
        <div className="flex flex-col justify-start place-items-start py-4">
          <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
            Create Post
          </button>
        </div>
      </Link>
    </div>
  );
}