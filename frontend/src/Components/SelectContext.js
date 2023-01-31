import React, { useState, createContext, useContext } from "react";
import { productData } from "../data";

const ProductContext = createContext();
const ProductProvider = ({ children }) => {
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [products, setProducts] = useState(productData);
  const [type, setType]= useState("");
  const [inputs, setInputs]= useState({});
  const [name, setName]= useState('');
  const [price, setPrice]= useState('');
  const [size, setSize]= useState('');
  const [length, setLength]= useState('');
  const [width, setWidth]= useState('');
  const [height, setHeight]= useState('');
  const [weight, setWeight]= useState('');
  return (
    <ProductContext.Provider
      value={{
        products,
        setProducts,
        selectedProducts,
        setSelectedProducts,
        inputs,
        setInputs,
        type,
        setType,
        name,
        setName,
        price,
        setPrice,
       size, setSize, length, setLength, width, setWidth, height, setHeight, weight, setWeight
      }}
    >
      {children}
    </ProductContext.Provider>
  );
};
export const ProductState = () => {
  return useContext(ProductContext);
};
export default ProductProvider;