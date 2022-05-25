import firebase from 'firebase'

const firebaseConfig = {
  apiKey: 'AIzaSyAE4WO-m6ZveovvpzDdN78Lx1qY9w8J5c0',
  authDomain: 'whatsapp-clone-e0f84.firebaseapp.com',
  projectId: 'whatsapp-clone-e0f84',
  storageBucket: 'whatsapp-clone-e0f84.appspot.com',
  messagingSenderId: '428287434887',
  appId: '1:428287434887:web:a5d120c17f3c8cbc395822',
}

const app = !firebase.apps.length
  ? firebase.initializeApp(firebaseConfig)
  : firebase.app()

const db = app.firestore()
const auth = app.auth()
const provider = new firebase.auth.GoogleAuthProvider()

export { db, auth, provider }
