import logo from './logo.svg';
import './App.css';
import Home from './pages/Home';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import AddProduct from './pages/AddProduct';
import './pages/Style.css'
import FindProduct from './pages/FindProduct';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/add-product' element={<AddProduct />} />
        <Route path='/find-product' element={<FindProduct />} />
      </Routes>
    </BrowserRouter>


  );
}

export default App;
