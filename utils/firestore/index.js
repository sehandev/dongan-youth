import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'
import { getStorage } from 'firebase/storage'

const firebaseConfig = {
  apiKey: 'AIzaSyCPbp4slc8y6nnX3Mrx38uxq_8vtMiDDxU',
  authDomain: 'ch-dongan.firebaseapp.com',
  projectId: 'ch-dongan',
  storageBucket: 'ch-dongan.appspot.com',
  messagingSenderId: '654427224733',
  appId: '1:654427224733:web:88779c1cab4362a6683274',
}

const app = initializeApp(firebaseConfig)
export const db = getFirestore(app)
export const storage = getStorage(app)
