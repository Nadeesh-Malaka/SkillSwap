import './App.css';
import  React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Landing from './Components/Landing_Page/Landing';


function App() {
  return (
    <div>
      <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing/>}/>
      </Routes>
      
      </BrowserRouter>
    </div>
  );
}

export default App;
