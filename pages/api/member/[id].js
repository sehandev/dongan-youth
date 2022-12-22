import { doc, getDoc, updateDoc, FieldValue } from 'firebase/firestore'

import { db } from '../../../utils/firestore'

export default async (req, res) => {
  const { id } = req.query

  const docRef = doc(db, 'members', id)
  try {
    if (req.method === 'PUT') {
      await updateDoc(docRef, {
        ...req.body,
        updated: FieldValue.serverTimestamp(),
      })
    } else if (req.method === 'GET') {
      const docSnap = await getDoc(docRef)
      if (!docSnap.exists) {
        res.status(404).end()
      } else {
        res.status(200).json(docSnap.data())
      }
    } else if (req.method === 'DELETE') {
      await updateDoc(docRef, {
        state: false,
        updated: FieldValue.serverTimestamp(),
      })
    }
    res.status(200).end()
  } catch (e) {
    res.status(400).end()
  }
}
