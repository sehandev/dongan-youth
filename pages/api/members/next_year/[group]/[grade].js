import { collection, doc, query, where, getDocs, setDoc } from 'firebase/firestore'

import { db } from '@/utils/firestore'

export default async (req, res) => {
  const { group, grade } = req.query
  const docRef = collection(db, 'members')
  const q = query(docRef, where('group', '==', group), where('grade', '==', grade))
  try {
    if (req.method === 'PUT') {
      const querySnapshot = await getDocs(q)
      querySnapshot.forEach(async (_doc) => {
        await setDoc(doc(db, 'members', _doc.id), {
          ..._doc.data(),
          // TODO Update group & grade automatically
          // group: group,
          // grade: '2',
        })
      })
    }
    res.status(200).end()
  } catch (e) {
    res.status(400).end()
  }
}
