import React from 'react'
import ShopProductCard from './ShopProductCard'
const ShopProducts = ({
    shopItems
}) => {
  return (
    <div className="h-full flex-1 bg-slate-300 p-2">
        <div className="grid grid-cols-2 bg-pink-200 h-full p-2 gap-4">
        {shopItems?.map((item)=>(
            <ShopProductCard item={item}/>
        ))}
        </div>
    </div>
  )
}

export default ShopProducts