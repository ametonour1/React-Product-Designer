import React,{useState} from 'react'
import { signInUserWithEmailAndPassword} from '../../firebase/firebaseAuth'
import ResetPassword from './ResetPassword'

const SignIn = () => {

    const [emailAddress,setEmailAddress] = useState(null)
    const [userPassword,setUserPassword] = useState(null)
    const [isPasswordReset,setIsPasswordReset] = useState(false)
    const [error,setError] = useState(null)
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
    <div>
      {!isPasswordReset ?
      <div>
      <label >email</label>
      <input  onChange={handleEmailChange} value ={emailAddress}/>
      <label>password</label>
      <input type="password" onChange={handlePasswordChange} value ={userPassword}/>
      <p onClick={handleIsPasswordReset}>I Forgot My Password</p>
      {error && <p  className="text-xxl">{error}</p>}
      <button onClick={handleSignIn}>sign in</button>
      </div>
      :
      <ResetPassword SetIsPasswordReset={setIsPasswordReset}/> }
    
  </div>
  )
}

export default SignIn