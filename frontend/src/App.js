import { Route, Routes } from 'react-router-dom';
import './App.css';
import AddProduct from './Components/AddProduct';
import Footer from './Components/Footer';
import Product from './Components/Product';

function App() {

  return (
    <div className="App">
      <Routes>
        <Route exact path="/" element={<Product />} />
        <Route path="/add-product" element={<AddProduct />} exact />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
