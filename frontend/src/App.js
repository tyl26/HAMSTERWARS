import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Starts from './pages/Starts';
import Gallery from './pages/Gallery';
import Battle from './pages/Battle';
import Statistik from './pages/Statistik';
import History from './pages/History';

console.log(process.env.NODE_ENV);

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Starts />}></Route>
        <Route exakt path='/gallery' element={<Gallery />}></Route>
        <Route path='/history' element={<History />}></Route>
        <Route path='/battle' element={<Battle />}></Route>
        <Route path='/statistik' element={<Statistik />}></Route>
      </Routes>
    </Router>
   
  );
}

export default App;
