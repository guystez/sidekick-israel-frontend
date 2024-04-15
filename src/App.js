import './App.css';
import { BrowserRouter, Routes ,Route, NavLink, Router } from 'react-router-dom';
import HomePage from './components/HomePage';
import Openers from './components/Openers';
import OpenersLiked from './components/OpenersLiked';
import TextLiked from './components/TextedLiked';
import Navbar from './components/NavBar';
import React, { useState } from 'react';

function App() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <BrowserRouter>
      <div className="App">
        <Navbar menuOpen={menuOpen} setMenuOpen={setMenuOpen} />
        <Routes>
          <Route path='/' element={<HomePage />} />
          <Route path='/openers' element={<Openers />} />
          <Route path='/openersliked' element={<OpenersLiked />} />
          <Route path='/textliked' element={<TextLiked />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
