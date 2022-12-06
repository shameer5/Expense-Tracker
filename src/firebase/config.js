import { initializeApp } from 'firebase/app'
import { getFirestore, Timestamp } from 'firebase/firestore'
import { getAuth } from 'firebase/auth'

const firebaseConfig = {
    apiKey: "AIzaSyDMVsgY9s_BYZt2bttl6sft_Egr7Oz2RlE",
    authDomain: "finance-tracker-d4d80.firebaseapp.com",
    projectId: "finance-tracker-d4d80",
    storageBucket: "finance-tracker-d4d80.appspot.com",
    messagingSenderId: "887165870390",
    appId: "1:887165870390:web:6ad7bb5735e2eb76895397"
  };

  //init firebase
  initializeApp(firebaseConfig)

  //init firestore
  const db = getFirestore()

  //init firebase auth
  const auth = getAuth()

  //init timeStamp
  const timestamp = Timestamp

  export { db, auth, timestamp }
