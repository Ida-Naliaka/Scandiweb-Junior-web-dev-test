import React, { useState } from 'react'
import './ProductCard.scss';
import { ProductState } from './SelectContext';


const ProductCard = ({
    sku,
    name,
    price,
    description,
}) => {
    const {selectedProducts, setSelectedProducts }= ProductState();
    const [selected, setSelected]= useState(false);
    const handleClick = () => {
        setSelected(!selected);
       !selected &&  setSelectedProducts([...selectedProducts, sku])
       selected && setSelectedProducts(selectedProducts.filter(item=> item!==sku))
      };

  return (
    <div className="card">
            <label className="checkbox-styled">
            <input type="checkbox" className='delete-checkbox' onClick={handleClick} />
            <span>
                <div className='param'>{sku} </div>
                <div className='param'>{name}</div>
                <div className='param'>${price}</div>
                <div className='param'>{description}</div>
                </span>
            </label>
        </div>
  )
}

export default ProductCard
