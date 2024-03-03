import React,{useState} from 'react'
import SignUp from './SignUp'
import SignIn from './SignIn'

const Auth = () => {

  const  [isSignIn,setIsSignIn] = useState(true)

  const handleSignInFalse = () => {
    setIsSignIn(false)
  }
  const handleSignInTrue = () => {
    setIsSignIn(true)
  }
  return (
    <div>
     
      {
      isSignIn
       ?
       <SignIn isSignIn={isSignIn} setIsSignIn={setIsSignIn}/> 
      :
      <SignUp isSignIn={isSignIn} setIsSignIn={setIsSignIn}/>
       
       }
       {isSignIn ? 
       <p onClick={handleSignInFalse}>dont have an account? sign Up</p>
       :
       <p onClick={handleSignInTrue}>Already have an account? sign In</p>

      }
    </div>
  )
}

export default Auth