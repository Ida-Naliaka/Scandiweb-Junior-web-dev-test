import React from "react";
import { ProductState } from "./SelectContext";

const Book = () => {
  // eslint-disable-next-line
  const { error, setError, inputs, setInputs, weight, setWeight } =
    ProductState();

  const handleChange = (e) => {
    const param = e.target.name;
    const value = e.target.value;
    // eslint-disable-next-line
    switch (param) {
      case "weight":
        if (isNaN(value) || value === "") {
          setError([...error, 6]);
          setWeight("")
        } else {
          setInputs((values) => ({ ...values, [param]: value }));
          setWeight(value);
          setError(error.filter((e) => e !== 6));
        }
        break;
    }
  };
  return (
    <>
      <div className="description">
        <label>Weight(KG)</label>
        <input
          type="number"
          name="weight"
          id="weight"
          placeholder="Product Weight"
          onChange={(e) => {
            handleChange(e);
          }}
          required
        />
      </div>
      <div className="info">Please provide weight in kilograms</div>
      {error.includes(6) && (
        <div className="error">Please, provide the data of indicated type</div>
      )}
    </>
  );
};

export default Book;
