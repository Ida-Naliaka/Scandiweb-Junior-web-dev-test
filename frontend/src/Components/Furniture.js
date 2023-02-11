import React from 'react'
import { ProductState } from './SelectContext';

const Furniture = () => {
    // eslint-disable-next-line
    const { error, setError, inputs, setInputs, length, setLength, width, setWidth, height, setHeight } = ProductState();
    
    const handleChange = (e) => {
        const param = e.target.name;
        const value = e.target.value;
        // eslint-disable-next-line
        switch (param) {
            case "height":
                if (isNaN(value) || value === "") {
                    setError([...error, 7]);
                } else {
                    setInputs(values => ({ ...values, [param]: value }))
                    setHeight(value);
                    setError(error.filter(e => e !== 7));
                }
                break;
            case "width":
                if (isNaN(value) || value === "") {
                    setError([...error, 8]);
                } else {
                    setInputs(values => ({ ...values, [param]: value }));
                    setWidth(value);
                    setError(error.filter(e => e !== 8));
                }
                break;
             case "length":
                if (isNaN(value) || value === "") {
                    setError([...error, 9]);
                } else {
                    setInputs(values => ({ ...values, [param]: value }));
                    setLength(value);
                    setError(error.filter(e => e !== 9));
                }
                break;
        }
    }
  return (
      <>
          <div className='description'>
              <label>Height(CM)</label>
              <input type="number" name="height" id='height' placeholder='Product Height' value={height} onChange={(e) => { setHeight(e.target.value); handleChange(e) }} required />
          </div>
          {error.includes(7) && <div className='error'>Please, provide the data of indicated type</div>}
          <div className='description'>
              <label>Width(CM)</label>
              <input type="number" name="width" id='width' placeholder='Product Width' value={width} onChange={(e) => { setWidth(e.target.value); handleChange(e) }} required />
          </div>
          {error.includes(8) && <div className='error'>Please, provide the data of indicated type</div>}
          <div className='description'>
              <label> Length(CM)</label>
              <input type="number" name="length" id='length' placeholder='Product Length' value={length} onChange={(e) => { setLength(e.target.value); handleChange(e) }} required />
          </div>
          {error.includes(9) && <div className='error'>Please, provide the data of indicated type</div>}
          <div className='info'>
              Please provide dimensions in (HxWxL) format
          </div>
      </>
  )
}

export default Furniture
