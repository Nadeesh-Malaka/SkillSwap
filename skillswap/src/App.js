import './App.css';
import  React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Landing from './Components/Landing_Page/Landing';
import ContactUs from './Components/ContactUs_page/ContactUs';


function App() {
  return (
    <div>
      <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing/>}/>
        <Route path='/contact_us' element={<ContactUs/>}/>
      </Routes>
      
      </BrowserRouter>
    </div>
  );
}

export default App;
