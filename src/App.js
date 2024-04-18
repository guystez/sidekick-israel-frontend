import './App.css';
import { BrowserRouter, Routes, Route, NavLink, Router } from 'react-router-dom';
import HomePage from './components/HomePage';
import Openers from './components/Openers';
import OpenersLiked from './components/OpenersLiked';
import TextLiked from './components/TextedLiked';
import Navbar from './components/NavBar';
import React, { useState } from 'react';
import Forum from './components/Forum';
import DialogModal from './components/DialogLogin';
import Terms from './components/Terms';

function App() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <BrowserRouter>
      <div className="App">
        <Navbar menuOpen={menuOpen} setMenuOpen={setMenuOpen} />
        <Routes>
          <Route path='/' element={<HomePage />} />
          <Route path='/login' element={<DialogModal />} />
          <Route path='/forum' element={<Forum />} />
          <Route path='/openers' element={<Openers />} />
          <Route path='/openersliked' element={<OpenersLiked />} />
          <Route path='/textliked' element={<TextLiked />} />
          <Route path='/terms' element={<Terms />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
