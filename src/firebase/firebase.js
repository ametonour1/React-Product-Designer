import { initializeApp } from "firebase/app";
import "firebase/auth"


const firebaseConfig = {
  apiKey: "AIzaSyBLU19BOtSOgAOycxGd3TojXtgXHoDfhVE",
  authDomain: "reactproductdesigner.firebaseapp.com",
  projectId: "reactproductdesigner",
  storageBucket: "reactproductdesigner.appspot.com",
  messagingSenderId: "1027362109300",
  appId: "1:1027362109300:web:10b567f87331f236725e21"
};


const fireBaseApp = initializeApp(firebaseConfig);
export default fireBaseApp