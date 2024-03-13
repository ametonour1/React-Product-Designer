import React,{useState} from 'react'
import { signInUserWithEmailAndPassword} from '../../firebase/firebaseAuth'
import ResetPassword from './ResetPassword'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import {login} from "../../redux/actions/authActions"
const SignIn = () => {

    const [emailAddress,setEmailAddress] = useState(null)
    const [userPassword,setUserPassword] = useState(null)
    const [isPasswordReset,setIsPasswordReset] = useState(false)
    const [error,setError] = useState(null)
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const handleEmailChange = (event) => {
      setEmailAddress(event.target.value)
      console.log(event.target.value)
    }
    const handlePasswordChange = (event) => {
      setUserPassword(event.target.value)
     
    }

    const handleSignIn =  async () => {
        try{
            const user = await signInUserWithEmailAndPassword(emailAddress,userPassword)
            console.log("user:",user)
            dispatch(login(user))
            navigate("/")
           
        }catch(error){
            let errorMessage = "Something Went Wrong,Please Try Againg"
            switch(error.code){
                case "auth/invalid-credential":
                    errorMessage = "Invalid Credentials Please Try Again "
                    break
                case "auth/missing-password":
                        errorMessage = "Password Field Must Be Filled"
                        break
                case "auth/invalid-email":
                        errorMessage = "Email Format Is Incorrect"
                        break
            }
            console.log("Error signing In catch:",error)
            setError(errorMessage)
        }
       
    
      }

      const handleIsPasswordReset = () => {
        setIsPasswordReset(!isPasswordReset)
        console.log(isPasswordReset)
      }


  return (
    <div className=" h-full w-full flex flex-col justify-center items-center">
      {!isPasswordReset ?
      <div className=" h-full w-full flex flex-col justify-center  items-center gap-1">
     <div className=" w-full h-full flex flex-col justify-center  items-center gap-2">
     <label className="text-xl text-gray-800 font-light" >Email</label>
      <input className="w-full p-2 outline-none border-none rounded-md text-lg text-gray-800"  onChange={handleEmailChange} value ={emailAddress}/>
     </div>
     <div className=" w-full h-full flex flex-col justify-center  items-center gap-2">
     <label className="text-xl text-gray-800 font-light">Password</label>
      <input className="w-full p-2 outline-none border-none rounded-md text-lg text-gray-800" type="password" onChange={handlePasswordChange} value ={userPassword}/>
      <p className="text-xs text-gray-800 font font-light" onClick={handleIsPasswordReset}>I Forgot My Password</p>
     </div>
      {error && <p  className="text-xxl">{error}</p>}
      <button className='text-2xl text-white font-light  bg-blue-700 p-2 w-full hover:scale-105 hover:bg-blue-600 transition' onClick={handleSignIn}>sign in</button>
      </div>
      :
      <ResetPassword SetIsPasswordReset={setIsPasswordReset}/> }
    
  </div>
  )
}

export default SignIn