import React, { useState } from 'react'
import ShopControls from './ShopControls'
import ShopProducts from './ShopProducts'

const Shop = () => {
  const [shopItems,setShopItems] = useState(null)
  return (
    <div className="h-full flex bg-red-300">
      <ShopControls 
      setShopItems={setShopItems}/>
      <ShopProducts
      shopItems={shopItems}
      />
    </div>
  )
}

export default Shop