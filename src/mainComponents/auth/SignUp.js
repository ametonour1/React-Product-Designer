import React,{useEffect, useState} from 'react'
import { signUpWithEmailAndPassword, signInUserWithEmailAndPassword,deleteUnVerifedUser } from '../../firebase/firebaseAuth'
import {useNavigate} from "react-router-dom"
const SignUp = () => {


  const [emailAddress,setEmailAddress] = useState(null)
  const [userPassword,setUserPassword] = useState(null)
  const [signUpCompleated,setSignUpCompleated] = useState(false)
  const [userVerified,SetUserVerified] = useState(false)
  const [user,setUser] = useState(null)
  const [error,setError] = useState(null)
  const navigate = useNavigate()

  const redirectHome = () =>{
    if(userVerified){
      navigate("/")
    }
  }
  const handleEmailChange = (event) => {
    setEmailAddress(event.target.value)
    console.log(event.target.value)
  }
  const handlePasswordChange = (event) => {
    setUserPassword(event.target.value)
   
  }
  const handleSignUp =  async () => {
    try{
        const user = await signUpWithEmailAndPassword(emailAddress,userPassword)
        
        
        setSignUpCompleated(true)

    }catch(error){
        let errorMessage = "Something Went Wrong , Please Try Again"

        switch(error.code){
            case "auth/invalid-email":
               errorMessage = "Email Format Is Invalid Please Try Again"
               break
            case "auth/missing-password":
                errorMessage = "Password Field Cannot be Empty"
               break
            case "auth/weak-password":
                errorMessage = "Password Must Contain At Least 6 Characters"
                break
            case "auth/admin-restricted-operation":
                errorMessage = "Please Enter Email And Password to Sign Up"
                break
            case "auth/email-already-in-use":
                errorMessage = "Email Already In Use"
        }
        console.log(error.code)
        setError(errorMessage)
    }
    

  }
 

  useEffect(()=>{
    if(signUpCompleated && !userVerified) {
    
      let timer;
      let count = 0

      const checkVerification = async () =>{
       
        const signInUser = await signInUserWithEmailAndPassword(emailAddress,userPassword)
      
        console.log(signInUser)
        if (signInUser.emailVerified) {
          console.log("userVerifed")
          SetUserVerified(true)
          setUser(signInUser)
        }else{
          console.log("not verifed yet")
        }
        
        count++
        if (count >= 10 || userVerified){
          clearInterval(timer)
          console.log("interval is over")
        }
        if (count >= 10 && !userVerified){
        const removeUser = await  deleteUnVerifedUser(signInUser)
        console.log("user verification failed,removed user",removeUser)
        redirectHome()
        }
      }
     if (!userVerified){
      checkVerification()
     }
      timer = setInterval(checkVerification,20000)

      return () => clearInterval(timer)

    }
   
    if (userVerified){
      redirectHome()
    }
  },[signUpCompleated,userVerified])

  return (
    <div>
      {!signUpCompleated 
      ?
       <div>
         <label >email</label>
      <input  onChange={handleEmailChange} value ={emailAddress}/>
      <label>password</label>
      <input type="password" onChange={handlePasswordChange} value ={userPassword}/>
      <button onClick={handleSignUp}>signUp</button>
      {error && <p  className="text-xxl">{error}</p>}
      </div> 
      : 
      <p>
        verifcation Email has been sent 
      </p>}
     
    </div>
  )
}

export default SignUp