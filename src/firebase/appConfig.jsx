// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
//importamos el servicio de la autenticacion
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
    authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
    projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
    storageBucket: import.meta.env.VITE_FIREBASE_STORAGE,
    messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGIN,
    appId: import.meta.env.VITE_FIREBASE_APP_ID
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
//firestore
//auth
//Indicamos que se va utilizar el servicio de la autenticacion con la app
const auth_user = getAuth(app)
const providerGoogle = new GoogleAuthProvider()
export { auth_user, providerGoogle };
//creamos una constante que nos va ayudar a conectarnos a la bd de firebase
const db = getFirestore(app)
export default db
