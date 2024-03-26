import React from 'react'

const AdminAddProduct = ({
    setProductName,
    setProductPrice,
    setProductCategory,
    setProductDescription,
    setProductImage,
    productName,
    productPrice,
    productCategory,
    productDescription,
    productImage

}) => {

    const handleProductNameChange = (e) =>{
        setProductName(e.target.value)
    }
    const handleProductPriceChange = (e) =>{
        setProductPrice(e.target.value)
    }
    const handleProductCategoryChange = (e) =>{
        setProductCategory(e.target.value)
    }
    const handleProductDescriptionChange = (e) =>{
        setProductDescription(e.target.value)
    }
    const handleProductImageChange = (e) =>{
        const file = e.target.files[0];
        previewImage(file)
        console.log(file)
    }

    const previewImage = (file) => {
        const reader = new FileReader();
        reader.onload = () => {
          
          setProductImage(reader.result);
        };
        reader.readAsDataURL(file);
      };

  return (
    <div>
        <div>
            <label>Name</label>
            <input onChange={handleProductNameChange} value={productName}/>
        </div>
        <div>
            <label>Category</label>
            <input onChange={handleProductCategoryChange} value={productCategory} />
        </div>
        <div>
            <label>Price</label>
            <input type="number" onChange={handleProductPriceChange} value={productPrice}/>
        </div>
        <div>
            <label>Description</label>
            <input onChange={handleProductDescriptionChange} value={productDescription}/>
        </div>
        <div>
            <label>Add Image</label>
            <input onChange={handleProductImageChange} type="file"/>
        </div>
    </div>
  )
}

export default AdminAddProduct