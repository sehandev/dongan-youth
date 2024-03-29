import { collection, addDoc, FieldValue } from 'firebase/firestore'

import { db } from '../../../utils/firestore'

export default async (req, res) => {
  let role = 'student'
  if (req.body.grade === '0' && req.body.class === '0') {
    role = 'teacher'
  }
  try {
    const { id } = await addDoc(collection(db, 'members'), {
      ...req.body,
      state: true,
      dongan_id: '00000',
      role,
      // created: FieldValue.serverTimestamp(),
    })
    res.status(200).json({ id })
  } catch (e) {
    console.error(e)
    res.status(400).end()
  }
}
