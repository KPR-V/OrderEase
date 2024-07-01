
import { initializeApp } from "firebase/app";
import 'firebase/auth'

const firebaseConfig = {
  apiKey: "AIzaSyCT2l8jh9O8gDyzEgmfNBEgGsbXBrzxmNI",
  authDomain: "orderease-ea1b0.firebaseapp.com",
  projectId: "orderease-ea1b0",
  storageBucket: "orderease-ea1b0.appspot.com",
  messagingSenderId: "950741819333",
  appId: "1:950741819333:web:c6decdf86d88df22e075ac",
  measurementId: "G-LM61KQW2G5"
};


const app = initializeApp(firebaseConfig);

export default app;