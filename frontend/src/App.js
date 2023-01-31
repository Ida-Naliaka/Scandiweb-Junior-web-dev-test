import { Route, Routes } from 'react-router-dom';
import './App.css';
import Footer from './Components/Footer';
import Navbar from './Components/Navbar';
import Product from './Pages/Product';
import ProductAdd from './Pages/ProductAdd';
import ProductList from './Pages/ProductList';

function App() {
  return (
    <div className="App">
    <Navbar />
    <Routes>
      <Route exact path="/" element={<ProductList />} />
      <Route path="/add-product" element={<ProductAdd />} exact />
      <Route path="/product/:sku" element={<Product />} exact />
    </Routes>
    <Footer />
    </div>
  );
}

export default App;
