import React,{useState,useEffect} from 'react'
import { ResetUserPassword } from '../../firebase/firebaseAuth'
const ResetPassword = ({
    setIsPasswordReset
}) => {
    const [emailAddress,setEmailAddress] = useState(null)
    const [error,setError] = useState(null)

    const handleEmailChange = (event) => {
        setEmailAddress(event.target.value)
        console.log(event.target.value)
      }
      const handlePasswordReset = async () =>{
        try{
         const result = await ResetUserPassword(emailAddress)
         console.log(result)
        }catch(error){
            console.log(error.code)
            setError("Invalid Email , Please Try Again")
        }
      }

      useEffect(() => {
       
        const timeout = setTimeout(() => {
          setError(null);
          console.log("useEffectRan")
        }, 5000);
      
       
        return () => clearTimeout(timeout);
      }, [error]);

  return (
    <div className="flex flex-col h-full w-full justify-center items-center gap-5">
         <label  className="text-xl text-textBaseColor font-bold" >Email Address</label>
      <input placeholder='example@email.com' className="w-full bg-backgroundColorPrimary p-2 outline-none border-none rounded-md text-lg text-textBaseColor" onChange={handleEmailChange} value ={emailAddress}/>
      <button className='text-2xl text-white font-bold rounded-lg  bg-gradient-to-b from-textGradientPrimary  to-textGradientSecondary  p-2 w-full hover:scale-105  transition'  onClick={handlePasswordReset} >Reset Password</button>
   {error && <p className='text-lg text-red-600'>{error}</p>}
    </div>
  )
}

export default ResetPassword