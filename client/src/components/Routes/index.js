import React from 'react';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import Home from '../../pages/Home';
import Profil from '../../pages/Profil';
import Trending from '../../pages/Trending';
import Navbar from '../Navbar';

function index() {

  return(
    <BrowserRouter>
        <Navbar />
        <Routes>
            <Route path='*' element={<Navigate to='/' />} />
            <Route path="/" element={<Home />} />
            <Route path="/profil" element={<Profil />} />
            <Route path="/trending" element={<Trending />} />
        </Routes>
    </BrowserRouter>
 );
}
export default index;