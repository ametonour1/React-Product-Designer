import React from 'react'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { signUserOut } from '../../firebase/firebaseAuth'
const NavbarMenu = () => {

  const user = useSelector(state =>  state.auth.isLoggedIn)

  return (
    <div className=" flex flex-col justify-center items-center gap-5 mt-5 lg:mt-0 lg:flex-row">
      <Link to="/"><p className="font-normal text-2xl lg:text-lg md:text-3xl text-textBaseColor hover:text-black">Home</p></Link>
      <Link to="/app"><p className="font-normal text-2xl lg:text-lg md:text-3xl text-textBaseColor  hover:text-black">Designer</p></Link>
      <Link to="/shop"><p className="font-normal text-2xl lg:text-lg md:text-3xl text-textBaseColor  hover:text-black">Shop</p></Link>
      {user 
      ?
    <p onClick={signUserOut} className="font-normal text-2xl lg:text-lg md:text-3xl text-textBaseColor  hover:text-black">Sign Out</p>
    :
    <Link to="/signin"><p className="font-normal text-2xl lg:text-lg md:text-3xl text-textBaseColor  hover:text-black">Sign In</p></Link>
    }
    </div>
  )
}

export default NavbarMenu