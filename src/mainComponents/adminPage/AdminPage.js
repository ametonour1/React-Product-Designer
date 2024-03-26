import React, { useState } from 'react'
import AdminAddProduct from './AdminAddProduct'
import AdminCanvas from './AdminCanvas'
import AdminCanvasSliders from './AdminCanvasSliders'
import { addProductToFirestore,fetchProductsFromFirestore, fetchProductCategories } from '../../firebase/firebaseAuth'
const AdminPage = () => {

  const [productName,setProductName] = useState(null)
  const [productPrice,setProductPrice] = useState(null)
  const [productCategory,setProductCategory] = useState(null)
  const [productDescription,setProductDescription] = useState(null)
  const [productImage,setProductImage] = useState(null)

  const [adminCanvasWidth,setAdminCanvasWidth] = useState(0.2);
  const [adminCanvasHeight,setAdminCanvasHeight] = useState(0.2);
  const [adminCanvasPaddingTop,setAdminCanvasPaddingTop] = useState(1);
  const [adminCanvasPaddingLeft,setAdminCanvasPaddingLeft] = useState(1);
  return (
    <div className="h-full  flex flex-row-reverse bg-inherit">
     <div className="flex-1 bg-backgroundColorPrimary">
      <AdminCanvas
      productImage={productImage}
      adminCanvasHeight={adminCanvasHeight}
      adminCanvasWidth={adminCanvasWidth}
      adminCanvasPaddingTop={adminCanvasPaddingTop}
      adminCanvasPaddingLeft={adminCanvasPaddingLeft} 
      setAdminCanvasHeight={setAdminCanvasHeight}
      setAdminCanvasWidth={setAdminCanvasWidth}
      setAdminCanvasPaddingTop={setAdminCanvasPaddingTop}
      setAdminCanvasPaddingLeft={setAdminCanvasPaddingLeft}
      />
      </div>
      <div className="flex-2  bg-gray-800 ">
      <AdminAddProduct 
      setProductName={setProductName}
      setProductPrice={setProductPrice}
      setProductCategory={setProductCategory}
      setProductDescription={setProductDescription}
      setProductImage={setProductImage}
      productName={productName}
      productPrice={productPrice}
      productCategory={productCategory}
      productDescription={productDescription}
      productImage={productImage}/>
      <AdminCanvasSliders
        adminCanvasHeight={adminCanvasHeight}
        adminCanvasWidth={adminCanvasWidth}
        adminCanvasPaddingTop={adminCanvasPaddingTop}
        adminCanvasPaddingLeft={adminCanvasPaddingLeft} 
        setAdminCanvasHeight={setAdminCanvasHeight}
        setAdminCanvasWidth={setAdminCanvasWidth}
        setAdminCanvasPaddingTop={setAdminCanvasPaddingTop}
        setAdminCanvasPaddingLeft={setAdminCanvasPaddingLeft}
        />
        <button onClick={()=>addProductToFirestore(productName,productCategory,productDescription,productImage,productPrice,adminCanvasHeight,adminCanvasWidth,adminCanvasPaddingLeft,adminCanvasPaddingTop)} >Add Product</button>
        <button className="bg-red-600" onClick={fetchProductsFromFirestore}>test</button>
        <button className="bg-red-600" onClick={fetchProductCategories}>fetch categoryes</button>
        </div>
        
    </div>
  )
}

export default AdminPage