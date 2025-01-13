import './App.css';
import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Landing from './Components/Landing_Page/Landing';
import ContactUs from './Components/ContactUs_page/ContactUs';
import FAQ from './Components/FAQ_Page/FAQ';
import Register from './Components/Register_page/Register';
import Login from './Components/Login_Page/Login';
import Home from './Components/Home_Page/Home';
import AdminHome from './Components/Admin/Home/AdminHome';
import Profile from './Components/Profile_Page/Profile';
import SkillListing from './Components/Skills/Skill_Listing';
import Chat from './Components/Chat_Page/Chat';

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          {/* Default route set to Landing page */}
          <Route path="/" element={<Landing />} />
          
          {/* Other routes */}
          <Route path='/home' element={<Home />} />
          <Route path="/contact_us" element={<ContactUs />} />
          <Route path="/faq" element={<FAQ />} />
          <Route path='/register' element={<Register />} />
          <Route path='/login' element={<Login />} />
          <Route path='/profile' element={<Profile/>} />
          <Route path='/skill_list' element={<SkillListing/>}/>
          <Route path='/chat' element={<Chat/>}/>

          {/* Admin route */}
          <Route path='/admin/home' element={<AdminHome />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
