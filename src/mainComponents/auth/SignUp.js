import React,{useEffect, useState} from 'react'
import { signUpWithEmailAndPassword, signInUserWithEmailAndPassword,deleteUnVerifedUser,registerUserToFirestore, removeRegisteredUser } from '../../firebase/firebaseAuth'
import {useNavigate} from "react-router-dom"
import { useSelector, useDispatch } from 'react-redux'
import {setTestReducerData} from "../../redux/actions/testAction.js"
import {login} from "../../redux/actions/authActions.js"
const SignUp = () => {


  const [emailAddress,setEmailAddress] = useState(null)
  const [userPassword,setUserPassword] = useState(null)
  const [signUpCompleated,setSignUpCompleated] = useState(false)
  const [userVerified,SetUserVerified] = useState(false)
  const [error,setError] = useState(null)
  const navigate = useNavigate()

  const [displayName,setDisplayName] = useState(null)
  const [phoneNumber,setPhoneNumber] = useState(null)
  const [street,setStreet] = useState(null)
  const [city,setCity] = useState(null)
  const [country,setCountry] = useState(null)
  const [zipCode,setZipCode] = useState(null)
  const dispatch = useDispatch()
  const activeUser = useSelector((state) => state.auth.user)
  const isUserLoggedIn = useSelector((state) => state.auth.isLoggedIn)

  useEffect(()=>{
    console.log(activeUser)
  dispatch(setTestReducerData("ahhhhhhhhhhh"))
  },[])
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
  const handleDisplayNameChange = (event) => {
    setDisplayName(event.target.value)
   
  }
  const handlePhoneNumberChange = (event) => {
    setPhoneNumber(event.target.value)
   
  }
  const handleStreetChange = (event) => {
    setStreet(event.target.value)
   
  }
  const handleCityNameChange = (event) => {
    setCity(event.target.value)
   
  }
  const handleCountryChange = (event) => {
    setCountry(event.target.value)
   
  }
  const handleZipCodeChange = (event) => {
    setZipCode(event.target.value)
   
  }
  const handleSignUp =  async () => {
    try{
      if (displayName && phoneNumber && street && country && zipCode && city) {
        const user = await signUpWithEmailAndPassword(emailAddress,userPassword)
        
        setSignUpCompleated(true)
      }else {
        setError("Contact Details Are Missing")
      }
       

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
        const registerUser = await registerUserToFirestore(signInUser,displayName,phoneNumber,street,city,country,zipCode)
          SetUserVerified(true)
          dispatch(login(signInUser))
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

  useEffect(()=>{
    const timeout = setTimeout(() => {
      setError(null);
      console.log("useEffectRan")
    }, 5000);
  
   
    return () => clearTimeout(timeout);
  },[error])

  return (
    <div className="h-full w-full">
      {!signUpCompleated 
      ?
       <div className="h-full w-full flex flex-col justify-center items-start gap-1 ">
        <label className="text-lg text-textBaseColor " >Name</label>
      <input onChange={handleDisplayNameChange} value={displayName}  placeholder='name' className="w-full bg-backgroundColorPrimary p-1 outline-none border-none rounded-md text-lg text-textBaseColor" />
      <label className="text-lg text-textBaseColor " >Phone Number</label> 
      <input  onChange={handlePhoneNumberChange} value={phoneNumber} placeholder='6985521472' className="w-full bg-backgroundColorPrimary p-1 outline-none border-none rounded-md text-lg text-textBaseColor"/>
      <div className="flex gap-1">
        <div className="flex flex-col justify-center items-start">
         <label className="text-textBaseColor text-lg ">Street</label>
         <input onChange={handleStreetChange} value={street} placeholder='Waterloo Avenue 52' className="w-full bg-backgroundColorPrimary p-1 outline-none border-none rounded-md text-lg text-textBaseColor"/>
         <label className="text-textBaseColor text-lg ">City</label>
         <input onChange={handleCityNameChange} value={city} placeholder='London' className="w-full bg-backgroundColorPrimary p-1 outline-none border-none rounded-md text-lg text-textBaseColor"/>
        </div>
        <div className="flex flex-col justify-center items-start">
         <label className="text-textBaseColor text-lg ">Country</label>
         <input onChange={handleCountryChange} value={country}  placeholder='United Kingdom' className="w-full bg-backgroundColorPrimary p-1 outline-none border-none rounded-md text-lg text-textBaseColor"/>
         <label className="text-textBaseColor text-lg ">Zip Code</label>
         <input onChange={handleZipCodeChange} value={zipCode} placeholder='145589' className="w-full bg-backgroundColorPrimary p-1 outline-none border-none rounded-md text-lg text-textBaseColor"/>
        </div>
      </div>
         <label className="text-lg text-textBaseColor " >Email</label>
      <input  placeholder='example@email.com' className="w-full bg-backgroundColorPrimary p-1 outline-none border-none rounded-md text-lg text-textBaseColor" onChange={handleEmailChange} value ={emailAddress}/>
      <label className="text-lg text-textBaseColor ">Password</label>
      <input placeholder='!1234:)' className="w-full bg-backgroundColorPrimary p-1 outline-none border-none rounded-md text-lg text-textBaseColor" type="password" onChange={handlePasswordChange} value ={userPassword}/>
      <button className='text-2xl text-white font-bold rounded-lg  bg-gradient-to-b from-textGradientPrimary  to-textGradientSecondary  p-2 w-full hover:scale-105  transition'  onClick={handleSignUp}>Sign Up</button>
      {error && <p  className="text-lg text-red-600">{error}</p>}
      </div> 
      : 
      <p className="justify-center items-center text-xl text-textBaseColor">
        verifcation Email has been sent 
      </p>}
     
    </div>
  )
}

export default SignUp