import { initializeApp } from "firebase/app";

import {
  getAuth,
  signInWithRedirect,
  signInWithPopup,
  GoogleAuthProvider,
} from "firebase/auth";

import {
getFirestore,
doc,
getDoc,
setDoc

} from 'firebase/firestore'



const firebaseConfig = {
  apiKey: "AIzaSyCvonD0IMZTwdu0bEtURJsVdDc8goZ-K8k",
  authDomain: "crwn-clothing-db-7aabd.firebaseapp.com",
  projectId: "crwn-clothing-db-7aabd",
  storageBucket: "crwn-clothing-db-7aabd.appspot.com",
  messagingSenderId: "990115541470",
  appId: "1:990115541470:web:5d7d72eee073262b0c6d4f",
};

const firebaseApp = initializeApp(firebaseConfig);

const provider = new GoogleAuthProvider();

provider.setCustomParameters({
    prompt: 'select_account',
  });



export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth, provider);

export const db =  getFirestore()

export const createUserDocumentFromAuth =  async (userAuth)=>{
    
    const userDocRef = doc(db, 'users', userAuth.uid)


    const userSnapshot =  await getDoc(userDocRef)
  


    //verificar si existen usuarios
    if (!userSnapshot.exists()){

      const { displayName, email} = userAuth

      const createAt = new Date()

      try {
        
        await setDoc(userDocRef,{
          displayName,
          email,
          createAt
        })
      } catch (error) {
        
        console.log('error creating user',error.message);
      }
    }

    return userDocRef
    //si usuario no existe

    // return userDocRef
}
