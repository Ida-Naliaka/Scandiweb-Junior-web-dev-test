import React, { useState, createContext, useContext } from "react";

const ProductContext = createContext();
const ProductProvider = ({ children }) => {
  const [sku, setSku] = useState("");
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [type, setType] = useState("");
  const [size, setSize] = useState("");
  const [weight, setWeight] = useState("");
  const [length, setLength] = useState("");
  const [width, setWidth] = useState("");
  const [height, setHeight] = useState("");
  const [inputs, setInputs] = useState({});
  const [products, setProducts] = useState([]);
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [show, setShow] = useState(true);
  const [error, setError] = useState([]);

  return (
    <ProductContext.Provider
      value={{
        show,
        setShow,
        products,
        setProducts,
        selectedProducts,
        setSelectedProducts,
        inputs,
        setInputs,
        sku,
        setSku,
        type,
        setType,
        name,
        setName,
        price,
        setPrice,
        size,
        setSize,
        length,
        setLength,
        width,
        setWidth,
        height,
        setHeight,
        weight,
        setWeight,
        error,
        setError,
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
