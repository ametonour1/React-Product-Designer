import React from 'react'
import ShoppingBasketIcon from '@mui/icons-material/ShoppingBasket';
import { Link } from 'react-router-dom';
import Avatar from '@mui/material/Avatar';

const NavbarUser = () => {
  return (
    <div className="flex gap-2">
      <Link to="/checkout">
        <div className="relative">
          <div className="">
        <ShoppingBasketIcon fontSize='large'/>
          </div>
        <p className="absolute top-4 left-4 bg-red-700 text-xs w-5 rounded-full flex justify-center items-center">1</p>
        </div>
      </Link>
      <Avatar />
    </div>
  )
}

export default NavbarUser