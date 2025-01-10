/* eslint-disable @typescript-eslint/no-explicit-any */

import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { Tooltip } from '@mui/material';

export default function Header() {

  const currentUser = useSelector(
    (state: any) => state.user && state.user.user.currentUser
  );

  return (
    <div className='max-w-screen-xl mx-auto px-4 sm:px-6 flex items-center justify-between py-4 '>
      <Link to="/">
      <div className="text-2xl font-bold">
        Influencer <span className="text-blue-500">View</span>
      </div>
      </Link>

       {/* adding profile image */}
       <div className="flex items-center cursor-pointer">
        {
          currentUser ?
          <Tooltip title="Profile" placement='bottom' arrow>
            <Link to="/profile">
                <img src={currentUser.user?.userprofile} alt="Profile" className="w-10 h-10 rounded-full" />
            </Link>
          </Tooltip>
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
