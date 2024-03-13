import React, { useEffect ,useState} from 'react'
import ShoppingBasketIcon from '@mui/icons-material/ShoppingBasket';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Avatar from '@mui/material/Avatar';
import { deepPurple,lightBlue} from '@mui/material/colors';


const NavbarUser = () => {

  const user = useSelector(state =>  state.auth.user)
  const [avatarLetter,setAvatarLetter] = useState(null)
  useEffect(()=>{
    if(user){
      const userEmail = user.email;
      const letter = userEmail.charAt(0).toUpperCase();
      setAvatarLetter(letter)
    }else{
      setAvatarLetter(null)
    }
  },[user])

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
      <Avatar sx={{bgcolor:deepPurple[300]}}>{avatarLetter}</Avatar>
    </div>
  )
}

export default NavbarUser