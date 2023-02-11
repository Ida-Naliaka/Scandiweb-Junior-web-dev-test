import React from 'react'
import { ProductState } from './SelectContext';

const DVD = () => {
    // eslint-disable-next-line
    const { error, setError, inputs, setInputs, size, setSize } = ProductState();
    
    const handleChange = (e) => {
        const param = e.target.name;
        const value = e.target.value;
        // eslint-disable-next-line
        switch (param) {
            case "size":
                if (isNaN(value) || value === "") {
                    setError([...error, 5]);
                } else {
                    setInputs(values => ({ ...values, [param]: value }));
                    setSize(value);
                    setError(error.filter(e => e !== 5));
                }
                break;
        }
    }
    return (
        <>
            <div className='description'>
                <label>Size(Mb)</label>
                <input type="number" name='size' id='size' placeholder='Product Size' value={size} onChange={(e) => { setSize(e.target.value); handleChange(e) }} required />
            </div>
            <div className='info'>
                Please provide size in Megabytes
            </div>
            {error.includes(5) && <div className='error'>Please, provide the data of indicated type</div>}
        </>
  )
}

export default DVD;
