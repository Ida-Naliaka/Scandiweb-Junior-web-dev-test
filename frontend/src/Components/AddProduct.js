import React, { useEffect, useState } from 'react'
import './AddProduct.scss'
import { ProductState } from './SelectContext';

const AddProduct = () => {
  const { products,
    setProducts,
    inputs,
    setInputs,
    type,
    setType,
    name,
    setName,
    price,
    setPrice,
    size, setSize, length, setLength, width, setWidth, height, setHeight, weight, setWeight }= ProductState();

    const[sku, setSku]= useState("");
    useEffect(()=>{
      const maxValueOfsku = Math.max(...products.map(o => o.sku), 0);
      setSku(maxValueOfsku+1);
      setInputs(values=> ({...values, sku : maxValueOfsku+1}))
    },[products])

  const handleChange=(e)=>{
    const param= e.target.name;
    const value= e.target.value;
    setInputs(values=> ({...values, [param] : value}))
  }
  
  return (
      <form id='product_form' className='product_form box'>
        <div className='description'>
          <label>SKU</label>
        <input type="text" name="sku" id='sku' value={sku} disabled required/>
        </div>
        <div className='description'>
        <label>Name</label>
        <input type="text" name="name" id='name' placeholder='Product Name' value={name} onChange={(e)=>{handleChange(e); setName(e.target.value)}} required/>
        </div>
        <div className='description'>
        <label>Price</label>
        <input type="number" step=".01" min=".01" name="price" placeholder='Product Price' id='price' value={price} onChange={(e)=>{handleChange(e); setPrice(e.target.value)}} required/>
        </div>
        <div className='description'>
        <label>Type Switcher</label>
        <select name="type" id="productType" onChange={(e)=>{setType(e.target.value); handleChange(e)}} required>
          <option value="">--Please choose product type--</option>
          <option value="DVD">DVD</option>
          <option value="Furniture">Furniture</option>
          <option value="Book">Book</option>
          </select>
        </div>
        <div className='box'>
        {type && type==="DVD" &&
        <>
          <div className='description'>
            <label>Size(Mb)</label>
            <input type="number" name='size' id='size' placeholder='Product Size' value={size}  onChange={(e)=>{setSize(e.target.value); handleChange(e)}} required/>
            </div>
        <div className='info'>
          Please provide size in Megabytes
          </div>
          </>}
        {type==="Furniture" &&
        <>
          <div className='description'>
          <label>Height(CM)</label>
          <input type="number" name="height" id='height' placeholder='Product Height' value={height}  onChange={(e)=>{setHeight(e.target.value); handleChange(e)}} required/>
          </div>
        <div className='description'>
          <label>Width(CM)</label>
          <input type="number" name="width" id='width' placeholder='Product Width' value={width}  onChange={(e)=>{setWidth(e.target.value); handleChange(e)}} required/>
          </div>
        <div className='description'>
          <label> Length(CM)</label>
          <input type="number" name="length" id='length' placeholder='Product Length' value={length}  onChange={(e)=>{setLength(e.target.value); handleChange(e)}} required/>
          </div>
          <div className='info'>
          Please provide dimensions in (HxWxL) format
          </div>
          </>}
          {type==="Book" &&
          <>
          <div className='description'>
        <label>Weight(KG)</label>
        <input type="number" name="weight" id='weight' placeholder='Product Weight' value={weight}  onChange={(e)=>{setWeight(e.target.value); handleChange(e)}} required/>
        </div>
        <div className='info'>
          Please provide weight in kilograms
        </div>
        </>}
        </div>
      </form>
  )
}

export default AddProduct
