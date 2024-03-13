import React from 'react'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { signUserOut } from '../../firebase/firebaseAuth'
const NavbarMenu = () => {

  const navigate = useNavigate()
  const user = useSelector(state =>  state.auth.isLoggedIn)

  const handleSignOut = () => {
    signUserOut()
    navigate("/")
  }
  return (
    <div className=" flex flex-col justify-center items-center gap-5 mt-5 lg:mt-0 lg:flex-row">
      <Link to="/"><p className="font-bold text-2xl lg:text-lg md:text-3xl text-textBaseColor hover:text-black">Home</p></Link>
      <Link to="/app"><p className="font-bold text-2xl lg:text-lg md:text-3xl text-textBaseColor  hover:text-black">Designer</p></Link>
      <Link to="/shop"><p className="font-bold text-2xl lg:text-lg md:text-3xl text-textBaseColor  hover:text-black">Shop</p></Link>
      {user 
      ?
    <p onClick={handleSignOut} className="font-bold text-2xl lg:text-lg md:text-3xl text-textBaseColor  hover:text-black cursor-pointer">Sign Out</p>
    :
    <Link to="/signin"><p className="font-bold text-2xl lg:text-lg md:text-3xl text-textBaseColor  hover:text-black">Sign In</p></Link>
    }
    </div>
  )
}

export default NavbarMenu