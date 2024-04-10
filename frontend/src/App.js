import React from "react";
import Login from "./login";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Signup from "./Signup";
import SwiggatoApp from "./project/home";
import Index1 from "./project/index1";
import Cart1 from "./project/cart";
import PaymentForm from "./project/payment";
import Loginsignup from "./project/LoginSignup";

function App() {
  return (
    <BrowserRouter>
      <Routes>
      <Route path='/login' element={<Login />} />
        <Route path='/project/index1' element={<Index1 />} />
        <Route path='/project/cart' element={<Cart1 />} />
        <Route path='/project/payment' element={<PaymentForm />} />
        <Route path='/' element={<SwiggatoApp />} />
        <Route path='signup/' element={<Signup />} />
        <Route path='/project/LoginSignup' element={<Loginsignup />} />
        
      </Routes>
    </BrowserRouter>
  )
}

export default App