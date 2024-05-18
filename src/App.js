import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HomePage from './components/HomePage';
import Openers from './components/Openers';
import OpenersLiked from './components/OpenersLiked';
import TextLiked from './components/TextedLiked';
import Navbar from './components/NavBar';
import React, { useState } from 'react';
import Forum from './components/Forum';
import DialogModal from './components/Dialogs/DialogLogin';
import Terms from './components/Terms';
import Settings from './components/Settings';
import FirstTimePage from './components/FirstTimePage';
import MainPage from './components/Bootslander/MainPage';
import Auth0Callback from './components/Auth0Callback'; // Create this component
import { Helmet } from 'react-helmet';

function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const themeColor = '#FFFF00';
  return (


    <BrowserRouter>

      <div className="App">

        <Helmet>
          <meta name="theme-color" content={themeColor} />
          <title>Chatmates</title>

        </Helmet>
        <Navbar menuOpen={menuOpen} setMenuOpen={setMenuOpen} />
        <Routes>
          <Route path='/' element={<MainPage />} />
          <Route path='/login' element={<DialogModal />} />
          <Route path='/forum' element={<Forum />} />
          <Route path='/openers' element={<Openers />} />
          <Route path='/openersliked' element={<OpenersLiked />} />
          <Route path='/textliked' element={<TextLiked />} />
          <Route path='/terms' element={<Terms />} />
          <Route path='/settings' element={<Settings />} />
          <Route path='/FirstTimePage' element={<FirstTimePage />} />
          <Route path='/Main' element={<HomePage />} />
          <Route path="/auth0_callback" element={<Auth0Callback />} />

        </Routes>
      </div>
    </BrowserRouter>

  );
}

export default App;
