import { collection, doc, query, where, addDoc, getDocs, deleteDoc } from 'firebase/firestore'

import { db } from '../../../utils/firestore'

export default async (req, res) => {
  try {
    const q = query(
      collection(db, 'attendance'),
      where('date', '==', req.body.date),
      where('member_id', '==', req.body.member_id),
    )
    const attendance = await getDocs(q)

    if (req.method == 'POST') {
      if (0 < attendance.docs.length) {
        res.status(404).end()
      } else {
        const { id } = await addDoc(collection(db, 'attendance'), {
          ...req.body,
        })
        res.status(200).json({ id })
      }
    } else if (req.method == 'DELETE') {
      if (attendance.docs.length === 0) {
        res.status(404).end()
      } else {
        await deleteDoc(doc(db, 'attendance', attendance.docs[0].id))
        res.status(200).end()
      }
    }
  } catch (e) {
    console.error(e)
    res.status(400).end()
  }
}
