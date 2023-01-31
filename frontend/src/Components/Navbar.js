import axios from 'axios'
import React, { useEffect } from 'react'
import {useNavigate} from 'react-router-dom'
import './Navbar.scss'
import { ProductState } from './SelectContext'
const Navbar = () => {
    const pageUrl= window.location.href.split('/')
    const pageTitle= pageUrl[pageUrl.length-1]
    const navigate= useNavigate()
    const {products, setProducts,
      selectedProducts, setSelectedProducts,
      inputs, setInputs,
      type, setType,
      name, setName,
      price, setPrice,
      size, setSize,
      length, setLength,
      width, setWidth,
      height, setHeight,
      weight, setWeight}= ProductState();
    
    useEffect(() => {
      getProducts();
      //eslint-disable-next-line
  }, []);

  async function getProducts () {
      await axios.get('http://localhost/scandiweb_backend/index.php').then((response)=>{
          setProducts(response.data);
      }).catch((error)=>{
        console.log(error);
      });
  }
  const handleSubmit= async(e)=>{
    e.preventDefault();
    if(!name||!price|| !type || (!size && !weight && (!length || !width || !height))){
      alert("Please, submit required data");
    } 
      await axios.post('http://localhost/scandiweb_backend/index.php', inputs).then((response)=>{
      console.log(response.data);
      setType('');
      setName('');
      setPrice('');
      setSize('');
      setLength('');
      setWidth(''); setHeight(''); setWeight('');
      getProducts();
      navigate('/');
    }
    ).catch((error)=>{
      console.log(error);
    })
  }
    const handleDelete= async()=>{
      console.log(selectedProducts);
      selectedProducts.map(async(prod)=>{
        await axios.delete(`http://localhost/scandiweb_backend/index.php?sku=${prod}`).then((response)=>{
            getProducts();
          }).catch((error)=>{
            console.log(error);
          })
        })
        }

  return (
    <div className='wrapper'>
        <div className='title'>
           {
           pageTitle==='add-product'?
           <h2>Product Add</h2>: 
           <h2>ProductList</h2>
           }
        </div>

        <div className='butttons'>
        { pageTitle==='add-product'?
        <>
        <button className='addnew' onClick={handleSubmit}>Save</button>
        <button className='massdelete'onClick={()=>{setInputs({}); setType(""); navigate('/'); getProducts()}}>Cancel</button>
        </>
        : 
        <>
        <button onClick={()=> navigate('/add-product')}>ADD</button>
        <button onClick={()=>handleDelete(selectedProducts)}>MASS DELETE</button>
        </>
        }
        </div>
      
    </div>
  )
}

export default Navbar;
