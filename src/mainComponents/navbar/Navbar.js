import React from 'react'
import NavbarLogo from "./NavbarLogo"
import NavbarMenu from "./NavbarMenu"
import NavbarUser from "./NavbarUser"
import MenuIcon from '@mui/icons-material/Menu';
const Navbar = ({
  menuToggle,
  setMenuToggle,
  setAnimantionCompleated
}) => {
  const handleMenuToggle = () =>{
    setMenuToggle(!menuToggle)
    setAnimantionCompleated(false)
    console.log(menuToggle)
  }
  return (
    <div className=" bg-backgroundColorSecondary lg:bg-backgroundColorPrimary flex flex-row items-center justify-between h-12"   >
      <div className="lg:hidden">
        <MenuIcon fontSize='large' onClick={handleMenuToggle}/>
      </div>
      <div className="flex ml-4 text-xl">
        <NavbarLogo/>
      </div>
       <div className="flex mr-4 gap-5">
        <div className='hidden  lg:flex justify-center items-center'>
        <NavbarMenu/>
        </div>
        <NavbarUser/>
      </div>
    </div>
  )
}

export default Navbar