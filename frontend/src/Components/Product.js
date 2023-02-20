import axios from "axios";
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Product.scss";
import { ProductState } from "./SelectContext";

const Product = () => {
  const {
    products,
    setProducts,
    selectedProducts,
    setSelectedProducts,
    show,
    setShow,
  } = ProductState();
  const navigate = useNavigate();
  const allElements = document.querySelectorAll(".delete-checkbox");

  useEffect(() => {
    getProducts();
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    show
      ? [].forEach.call(allElements, (el) => {
          el.style.display = "block";
        })
      : [].forEach.call(allElements, (el) => {
          el.style.display = "none";
        });
    // eslint-disable-next-line
  }, [show]);

  const getProducts = () => {
    axios
      .get("https://scandiwebidatest.000webhostapp.com/php/index.php")
      .then((response) => {
        setProducts(response.data);
      });
  };
  const handleClick = (item) => {
    document.querySelector(`#sku-${item}`).checked
      ? setSelectedProducts([...selectedProducts, item])
      : setSelectedProducts(selectedProducts.filter((i) => i !== item));
  };

  const handleDelete = () => {
    selectedProducts.map((prod) =>
      fetch("https://scandiwebidatest.000webhostapp.com/php/index.php", {
        method: "post",
        body: JSON.stringify({ sku: prod }),
      })
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          getProducts();
          data.status === 1 &&
            setSelectedProducts(
              selectedProducts.filter((item) => item !== prod)
            );
        })
    );
  };
  return (
    <>
      <div className="wrapper">
        <div className="title">
          <h2>ProductList</h2>
        </div>
        <div className="butttons">
          <button onClick={() => navigate("/add-product")}>ADD</button>
          <button
            onClick={() => {
              setShow(false);
              handleDelete();
            }}
            id="delete-product-btn"
          >
            MASS DELETE
          </button>
        </div>
      </div>
      <div className="product-list">
        {products.map((item) => (
          <label className="card" key={item.sku}>
            <div className="checkbox-styled">
              <input
                type="checkbox"
                className="delete-checkbox"
                id={`sku-${item.sku}`}
                onClick={() => {
                  setShow(true);
                  handleClick(item.sku);
                }}
              />
              <div>
                <h5>{item.sku} </h5>
                <p>{item.name}</p>
                <p>${item.price}</p>
                <p>{item.value}</p>
              </div>
            </div>
          </label>
        ))}
      </div>
    </>
  );
};

export default Product;
