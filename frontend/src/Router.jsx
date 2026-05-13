import React from 'react'
import { useEffect } from 'react';
import Home from './components/Home/Home'
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import Category from './components/Category/Category'
import Admin from './components/Admin/Admin'
import ProtectedRoute from './components/Login/ProtectedRoute'
import Login from './components/Login/Login'
import AboutPage from './components/About/AboutPage'



function Router() {
  return (
    <BrowserRouter>
      <AppRoutes />
    </BrowserRouter>
  )
}

function AppRoutes() {
  const location = useLocation();
  
   useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, [location.pathname]);
  
  return (
    <Routes>
      <Route path="/" element={<Home/>} />
      <Route 
        path="category/:categoryName" 
        element={<Category key={location.pathname} />}
      />
      <Route path="/login" element={<Login/>} />
      <Route path="/about" element={<AboutPage/>} />
      <Route path="/admin" element={
        <ProtectedRoute>
          <Admin/>
        </ProtectedRoute>
      } />
    </Routes>
  )
}

export default Router
