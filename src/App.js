import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Routes ,Route, NavLink, Router } from 'react-router-dom';
import HomePage from './components/HomePage';
import Openers from './components/Openers';

function App() {
  return (
    
      <BrowserRouter>
    <div className="App">
    
       
            <Routes>
                <Route path='/' element={<HomePage />} />
                <Route path='/openers' element={<Openers />} />
                
                
            </Routes>
    </div>
    </BrowserRouter>
  );
}

export default App;
