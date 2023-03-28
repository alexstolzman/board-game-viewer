import { Routes, Route } from 'react-router-dom';

import Home from './components/Home'
import Stats from './components/Stats'
import Header from './components/Header'
import Upload from './components/Upload'

import './App.scss';

function App() {
  return (
   <div className='App'>
    <Header />

    <Routes>
     <Route path="/" element={ <Home /> }/>
     <Route path="stats" element={ <Stats /> }/>
     <Route path="upload" element={ <Upload /> }/>
   </Routes>
   </div>
  );
}

export default App;
