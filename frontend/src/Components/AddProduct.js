import axios from "axios";
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./AddProduct.scss";
import { ProductState } from "./SelectContext";
import Book from "./Book";
import Furniture from "./Furniture";
import DVD from "./DVD";

const AddProduct = () => {
  // eslint-disable-next-line
  const {
    products,
    setProducts,
    error,
    setError,
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
  } = ProductState();
  const navigate = useNavigate();

  useEffect(() => {
    setSelectedProducts([]);
    getProducts();
    // eslint-disable-next-line
  }, []);

  const getProducts = () => {
    axios
      .get("https://scandiwebidatest.000webhostapp.com/php/index.php")
      .then((response) => {
        setProducts(response.data);
      });
  };
  const typeSetter = {
    Book: <Book />,
    DVD: <DVD />,
    Furniture: <Furniture />,
  };
  const handleChange = (e) => {
    const param = e.target.name;
    const value = e.target.value;
    // eslint-disable-next-line
    switch (param) {
      case "sku":
        const result = products.find((item) => item.sku === value);
        if (result || value.trim() === "") {
          setError([...error, 1]);
          setSku("");
        } else {
          setInputs((values) => ({ ...values, [param]: value }));
          setSku(value);
          setError(error.filter((e) => e !== 1));
        }
        break;
      case "name":
        if (value.trim() === "" || !isNaN(value)) {
          setError([...error, 2]);
          setName("")
        } else {
          setInputs((values) => ({ ...values, [param]: value }));
          setName(value);
          setError(error.filter((e) => e !== 2));
        }
        break;
      case "price":
        if (isNaN(value) || value <= 0) {
          setError([...error, 3]);
          setPrice("")
        } else {
          setInputs((values) => ({ ...values, [param]: value }));
          setPrice(value);
          setError(error.filter((e) => e !== 3));
        }
        break;
      case "type":
        if (value === "") {
          setError([...error, 4]);
          setType("")
        } else {
          setInputs((values) => ({ ...values, [param]: value }));
          setType(value);
          setError(error.filter((e) => e !== 4));
        }
        break;
    }
  };

  const reset = () => {
    setType("");
    setName("");
    setPrice("");
    setSku("");
    setSize("");
    setLength("");
    setWidth("");
    setHeight("");
    setWeight("");
    setInputs({});
    setError([]);
  };

  const handleSubmit = () => {
    if (
      !name ||
      !sku ||
      !price ||
      !type ||
      (!size && !weight && (!length || !width || !height))
    ) {
      alert("Please, submit required data");
    } else {
      fetch("https://scandiwebidatest.000webhostapp.com/php/index.php", {
        method: "post",
        body: JSON.stringify(inputs),
      })
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          getProducts();
          navigate("/");
          reset();
        });
    }
  };

  return (
    <>
      <div className="wrapper">
        <div className="title">
          <h2>Product Add</h2>
        </div>
        <div className="butttons">
          <button
            onClick={(e) => {
              e.preventDefault();
              handleSubmit();
            }}
          >
            Save
          </button>
          <button
            onClick={() => {
              reset();
              navigate("/");
            }}
          >
            Cancel
          </button>
        </div>
      </div>
      <form id="product_form" className="product_form box">
        <div className="description">
          <label>SKU</label>
          <input
            type="text"
            name="sku"
            id="sku"
            placeholder="Product SKU"
            onChange={(e) => {
              handleChange(e);
            }}
            required
          />
        </div>
        {error.includes(1) && (
          <div className="error">Please, provide unique sku</div>
        )}
        <div className="description">
          <label>Name</label>
          <input
            type="text"
            name="name"
            id="name"
            placeholder="Product Name"
            onChange={(e) => {
              handleChange(e);
            }}
            required
          />
        </div>
        {error.includes(2) && (
          <div className="error">
            Please, provide the data of indicated type
          </div>
        )}
        <div className="description">
          <label>Price</label>
          <input
            type="number"
            step=".01"
            min=".01"
            name="price"
            placeholder="Product Price"
            id="price"
            onChange={(e) => {
              handleChange(e);
            }}
            required
          />
        </div>
        {error.includes(3) && (
          <div className="error">
            Please, provide the data of indicated type
          </div>
        )}
        <div className="description">
          <label>Type Switcher</label>
          <select
            name="type"
            id="productType"
            onChange={(e) => {
              handleChange(e);
            }}
            required
          >
            <option value="">--Please choose product type--</option>
            <option value="DVD">DVD</option>
            <option value="Furniture">Furniture</option>
            <option value="Book">Book</option>
          </select>
        </div>
        {error.includes(4) && (
          <div className="error">
            Please, provide the data of indicated type
          </div>
        )}
        <div className="box">{typeSetter[type]}</div>
      </form>
    </>
  );
};

export default AddProduct;