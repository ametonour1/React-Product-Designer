import React from 'react'

const ShopProductCard = ({
    item
}) => {
  return (
    <div className="bg-blue-300 ">
        <div className="h-52">
        <img className="h-full" src={item.productImage}/>
        </div>
        <p>{item.productName}</p>
        <p>{item.productPrice}</p>
    </div>
  )
}

export default ShopProductCard