import './App.css';
import  React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Landing from './Components/Landing_Page/Landing';
import ContactUs from './Components/ContactUs_page/ContactUs';
import FAQ from './Components/FAQ_Page/FAQ';
import Register from './Components/Register_page/Register';
import Login from './Components/Login_Page/Login';



function App() {
  return (
    <div>
      <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing/>}/>
        <Route path="/contact_us" element={<ContactUs/>}/>
        <Route path="/faq" element={<FAQ/>}/>
        <Route path='/register' element={<Register/>}/>
        <Route path='/login' element={<Login/>}/>
        
      </Routes>
      
      </BrowserRouter>
    </div>
  );
}

export default App;
