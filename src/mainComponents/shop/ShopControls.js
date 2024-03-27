import React,{useState} from 'react'
import AdminCategories from '../adminPage/AdminCategories'
import { fetchProductsFromFirestore } from '../../firebase/firebaseAuth'
const ShopControls = ({
    setShopItems
}) => {
    
    const [productCategories,setProductCategory] = useState(null)
  
    const handleFetchProducts = async () => {
      const query = await fetchProductsFromFirestore(productCategories)
      setShopItems(query)
      console.log(query)
      
    }
  
    return (
    <div className="h-full">
        <AdminCategories
         productCategories={productCategories} 
        setProductCategory={setProductCategory}/>
    <button onClick={handleFetchProducts}>test</button>
    </div>
  )
}

export default ShopControls