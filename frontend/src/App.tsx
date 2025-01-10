/* eslint-disable @typescript-eslint/no-explicit-any */
import { useSelector } from 'react-redux'
import './App.css'
import Dashboard from './Components/Dashboard.tsx'
import Home from './Components/Home.tsx'
import SignIn from './Components/SignIn.tsx'
import {BrowserRouter, Routes, Route, Navigate} from 'react-router-dom'
import PrivateRoom from './pages/PrivateRoom.tsx'
import Detailspages from './Components/Detailspages.tsx'
import Header from './Components/Header.tsx'
import Profile from './Components/Profile.tsx'
import SingUp from './Components/SingUp.tsx'
import Createpost from './Components/Createpost.tsx'



function App() {

  const currentUser = useSelector(
    (state: any) => state.user && state.user.user.currentUser
  );

  return (
    <div>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/signin" element={<SignIn />} />
          <Route path="/" element={<Home />} />
          {/* add singup route */}
          <Route path="/signup" element={<SingUp />} />
          <Route
            path="/dashboard"
            element={currentUser ? <Dashboard /> : <Navigate to="/signin" />}
          />
          <Route path="/Mydetails/:sharingId" element={<Detailspages />} />
          <Route path="*" element={<Navigate to="/" />} />


          <Route element={<PrivateRoom />} />
          <Route path="/Mydetails/:sharingId" element={<Detailspages />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/createpost" element={<Createpost />} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
