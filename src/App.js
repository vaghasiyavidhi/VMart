import 'bootstrap/dist/css/bootstrap.min.css';
import { Route, Routes } from 'react-router-dom';
import './App.css';
import Header from './Component/Header';
import Shop from './Component/Shop';
import Product from './Component/Product';
import Cart from './Component/Cart';

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path='/' element={<Shop />}/>
        <Route path='product/:id' element={<Product />} />
        <Route path='cart' element={<Cart />} />
        
      </Routes>
    </>
  );
}

export default App;
