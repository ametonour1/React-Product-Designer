import React, { useEffect, useState } from 'react'
import { fetchProductCategories } from '../../firebase/firebaseAuth'
const AdminCategories = ({
    productCategory,
  
    setProductCategory
}) => {

    const [categoriesOptions,setCategoriesOptions] = useState(null)

    const handleProductCategoryChange = (e) =>{
        setProductCategory(e.target.value)
        
    }

    useEffect(()=>{
        const getCategoriesOptions =  async () => {
            const options = await fetchProductCategories()
            setCategoriesOptions(options)
        }
       getCategoriesOptions()
    },[])
  return (
    <div>
        <label>Category</label>
            <select value={productCategory}  onChange={handleProductCategoryChange}>
                {categoriesOptions?.map(option =>(
                    <option key={option.id} value={option.name}>
                        {option.name}
                    </option>
                ))}
            </select>
    </div>
  )
}

export default AdminCategories