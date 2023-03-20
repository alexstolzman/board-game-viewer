import { Routes, Route } from 'react-router-dom';

import Home from './components/Home'
import Stats from './components/Stats'
import Header from './components/Header'

import './App.css';

function App() {
  return (
   <div className='App'>
    <Header />

    <Routes>
     <Route path="/" element={ <Home /> }/>
     <Route path="stats" element={ <Stats /> }/>
     <Route path="upload"/>
   </Routes>
   </div>
  );
}

export default App;
