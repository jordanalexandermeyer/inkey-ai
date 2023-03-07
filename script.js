// Import the functions you need from the SDKs you need
const { initializeApp } = require("firebase/app")
const {
  collection,
  getDocs,
  getFirestore,
  updateDoc,
} = require("firebase/firestore")

const firebaseConfig = {
  apiKey: "",
  authDomain: "",
  projectId: "",
  storageBucket: "",
  messagingSenderId: "",
  appId: "",
  measurementId: "",
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)
const db = getFirestore(app)

const reset = async () => {
  const querySnapshot = await getDocs(collection(db, "usage_details"))
  querySnapshot.forEach((doc) => {
    updateDoc(doc.ref, { monthly_usage: 0 })
  })
}

reset()
