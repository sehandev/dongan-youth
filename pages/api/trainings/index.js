import { collection, addDoc } from 'firebase/firestore'

import { db } from '../../../utils/firestore'

export default async (req, res) => {
  try {
    if (req.method === 'POST') {
      const training_array = req.body
      training_array.forEach(async (training) => {
        await addDoc(collection(db, 'trainings'), training)
      })
      res.status(200).end()
    }
  } catch (e) {
    console.error(e)
    res.status(400).end()
  }
}
