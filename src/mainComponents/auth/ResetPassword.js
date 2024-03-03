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
    <div>
         <label >email</label>
      <input  onChange={handleEmailChange} value ={emailAddress}/>
      <button onClick={handlePasswordReset} >Reset Password</button>
   {error && <p>{error}</p>}
    </div>
  )
}

export default ResetPassword