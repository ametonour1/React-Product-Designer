import fireBaseApp from "./firebase"
import "firebase/auth"

import { getFirestore , collection,addDoc ,doc,setDoc, deleteDoc, serverTimestamp,getDocs,query,where} from "firebase/firestore";
import { getAuth,createUserWithEmailAndPassword, signInWithEmailAndPassword, sendPasswordResetEmail,sendEmailVerification, deleteUser,setPersistence,browserLocalPersistence,signOut} from "firebase/auth";
const auth = getAuth()
const firestore = getFirestore(fireBaseApp)
export const signUpWithEmailAndPassword = async (email,password) =>{
    try {
        await setPersistence(auth,browserLocalPersistence)
        const userCredentials = await createUserWithEmailAndPassword(auth,email,password);
        const user = userCredentials.user
        console.log("errrrrrrrrrrrr",user)
         await sendEmailVerification(user)
        return userCredentials.user;
    }catch (error) {
        console.error("error signing up",error)
        throw error
    }
}

export const signInUserWithEmailAndPassword = async (email,password) =>{
    try {
        await setPersistence(auth,browserLocalPersistence)
        const userCredentials = await signInWithEmailAndPassword(auth,email,password);
        return userCredentials.user;
    }catch (error) {
        console.error("error signing in",error)
        throw error
    }
}

export const signUserOut = async () => {
    try{
        await auth.signOut()
        
       
    }catch(error){
        console.error("error sighning out",error)
        throw error
    }

}

export const ResetUserPassword = async (email) => {

    try{
     const result = await sendPasswordResetEmail(auth,email)
        console.log("password sent to email:",email)
        return result;
    }catch(error){
        console.error("error sending reset email:",error)
        throw error
    }
}

export const deleteUnVerifedUser = async (signInUser) => {

    try{
        const result = await deleteUser(signInUser)
        console.log("userDeleted")
        return true
    }catch (error) {
        console.log(error)
        return false
    }
}

export const registerUserToFirestore = async (user,displayName,phoneNumber,street,city,country,zipCode) => {

    try{
    //const docRef = collection(firestore,"users")
    const userData = {
        displayName:displayName,
        phoneNumber:phoneNumber,
        emailAddress:user.email,
        Address:{
            city:city,
            country:country,
            street:street,
            zipCode:zipCode
        },
        userID:user.uid
    }
    const id = user.uid
    //const myDoc = doc(docRef,id)
   setDoc(doc(firestore,"users",id),userData)
  .then(() => {
    console.log('Document successfully written!');
  })
  .catch((error) => {
    console.error('Error writing document: ', error);
  });
    }catch(error) {
        console.log(error)
    }
    
}

export const removeRegisteredUser = async (id) => {

    try{
        const docRef = doc(firestore,"users",id)
        await deleteDoc(docRef)
        console.log("document deleted successfully:",id)
    }catch(error) {
        console.error("error deleting document",error)
    }

}

export const addProductToFirestore = async (productName,productCategory,productDescription,productImage,productPrice,adminCanvasHeight,adminCanvasWidth,adminCanvasPaddingLeft,adminCanvasPaddingTop) => {

   // console.log(productName,productCategory,productDescription,productPrice,productImage,adminCanvasHeight,adminCanvasWidth,adminCanvasPaddingLeft,adminCanvasPaddingTop,"errrrr")

   try{
    
    const timestamp = serverTimestamp()
    const price =  parseFloat(productPrice)
   const productData = {
    productName:productName,
    productPrice:price,
    productCategory:productCategory,
    productDescription:productDescription,
    productImage:productImage,
    adminCanvasHeight:adminCanvasHeight,
    adminCanvasWidth:adminCanvasWidth,
    adminCanvasPaddingTop:adminCanvasPaddingTop,
    adminCanvasPaddingLeft:adminCanvasPaddingLeft,
    creadtedAt:timestamp,
    updatedAt:timestamp
    
   }

   const docRef = await addDoc(collection(firestore,"products"),productData)
   console.log("document written id:",docRef.id)
   }catch(error){
    console.error(error)
   }
   
}

export const fetchProductCategories = async () => {
    try{

        const q = query(collection(firestore,"products"),where("productCategory"))

        const querySnapshot = await getDocs(q)
            
            querySnapshot.forEach((doc)=>{
                console.log(doc.id, " => ", doc.data())
            })
            
    }catch(error){
        console.error(error)
    }
   
}

export const fetchProductsFromFirestore = async () => {

    try{

        const q = query(collection(firestore,"products"), where("productPrice",">",0))
      
        const querySnapshot = await getDocs(q)
        console.log("brrrrrrrrrrrr",querySnapshot)
        querySnapshot.forEach((doc)=>{
            console.log(doc.id, " => ", doc.data())
        })
    }catch(error) {
        console.error(error)
    }
}