import React from 'react';
import ReactDOM from 'react-dom/client';
import {BrowserRouter,Routes,Route, Navigate} from 'react-router-dom'
import './index.css';
import HomePage from './landing_page/home/HomePage';

import Signup from './landing_page/signup/Signup'
import Login from './landing_page/login/Login'
import AboutPage from './landing_page/about/AboutPage'
import ProductPage from './landing_page/products/ProductsPage'
import PricingPage from './landing_page/pricing/PricingPage'
import SupportPage from './landing_page/support/SupportPage'
import Footer from './landing_page/Footer'
import Navbar from './landing_page/Navbar'
import NotFound from './landing_page/NotFound';
import DashboardLayout from './dashboard/DashboardLayout';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
<React.StrictMode>
  <BrowserRouter>
    <Routes>
      {/* Landing Page Routes */}
      <Route path='/' element={<><Navbar/><HomePage/><Footer/></>} />
      <Route path='/signup' element={<><Navbar/><Signup/><Footer/></>} />
      <Route path='/login' element={<><Navbar/><Login/><Footer/></>} />
      <Route path='/about' element={<><Navbar/><AboutPage/><Footer/></>} />
      <Route path='/product' element={<><Navbar/><ProductPage/><Footer/></>} />
      <Route path='/pricing' element={<><Navbar/><PricingPage/><Footer/></>}/>
      <Route path='/support' element={<><Navbar/><SupportPage/><Footer/></>} />
      
      {/* Dashboard Routes */}
      <Route path='/dashboard/*' element={<DashboardLayout />} />
      <Route path='/dashboard' element={<Navigate to="/dashboard" replace />} />
      
      <Route path='*' element={<><Navbar/><NotFound/><Footer/></>} />
    </Routes>
  </BrowserRouter>
</React.StrictMode>
);
