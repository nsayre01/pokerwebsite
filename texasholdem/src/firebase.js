
import firebase from "firebase/compat/app";
import "firebase/compat/firestore";
import 'firebase/compat/auth';
import { ref, onUnmounted } from 'vue'

const config = {
  apiKey: "AIzaSyCj4KQtjCRgvMCKG8aCStEaU0uQTGMr7v0",
  authDomain: "texasholdem-3c178.firebaseapp.com",
  projectId: "texasholdem-3c178",
  storageBucket: "texasholdem-3c178.appspot.com",
  messagingSenderId: "633189402237",
  appId: "1:633189402237:web:dc461da3382fd5a6161314",
  measurementId: "G-THZB2T2W9C"
}

const firebaseApp = firebase.initializeApp(config)

const db = firebaseApp.firestore()
const usersCollection = db.collection('users')

export const createUser = user => {
  return usersCollection.add(user)
}

export const getUser = async id => {
  const user = await usersCollection.doc(id).get()
  return user.exists ? user.data() : null
}

export const updateUser = (id, user) => {
  return usersCollection.doc(id).update(user)
}

export const deleteUser = id => {
  return usersCollection.doc(id).delete()
}   

export const useLoadUsers = () => {
  const users = ref([])
  const close = usersCollection.onSnapshot(snapshot => {
    users.value = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }))
  })
  onUnmounted(close)
  return users
}