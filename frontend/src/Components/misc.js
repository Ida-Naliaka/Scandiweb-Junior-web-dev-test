<table cellSpacing={10}>
          <tbody>
            <tr>
              <th>
                <label>SKU</label>
              </th>
              <td>
                <input type="text" value={sku} name="SKU" id='sku' required/>
              </td>
              <th>
                <label>Name</label>
              </th>
              <td>
                <input type="text" value={name} name="name" id='name' required/>
              </td>
              <th>
                <label>Price</label>
              </th>
              <td>
                <input type="number" value={price} name="price"id='price' required/>
              </td>
              <th>
                <label for="productType">Type Switcher</label>
              </th>
              <td>
                <select name="productType" id="productType" onChange={(e)=>{setProductType(e.target.value)}} required>
                  <option value="">--Please choose an option--</option>
                  <option value="DVD">DVD</option>
                  <option value="Furniture">Furniture</option>
                  <option value="Book">Book</option>
                  </select>
              </td>
            </tr>
            
              {productType==="DVD" && 
              <tr>
                <th>
                <label>Size(Mb)</label>
              </th>
              <td>
                <input value={size} id='size' required/>
              </td>
              </tr>}
              {productType==="Furniture" && 
              <tr>
                <th>
                <label>Height(CM)</label>
              </th>
              <td>
                <input value={height} name="height" id='height' required/>
              </td>
              <th>
                <label>Width(CM)</label>
              </th>
              <td>
                <input value={width} name="width" id='width' required/>
              </td>
              <th>
                <label>Length(CM)</label>
              </th>
              <td>
                <input value={length} name="length" id='length' required/>
              </td>
              </tr>}
              {productType==="Book" && 
              <tr>
                <th>
                <label>Weight(KG)</label>
              </th>
              <td>
                <input value={weight} id='weight' required/>
              </td>
              </tr>}
          </tbody>
        </table>