import { collection, query, where, getDocs, FieldPath } from 'firebase/firestore'

import { db } from '../../../../../utils/firestore'

export default async (req, res) => {
  const { name, date } = req.query

  try {
    if (req.method === 'GET') {
      const q1 = query(collection(db, 'trainings'), where('date', '==', date), where('name', '==', name))
      const trainings_doc_array = await getDocs(q1)
      const member_id_array = []
      trainings_doc_array.forEach((doc) => {
        member_id_array.push(doc.data().member_id)
      })
      const q2 = query(collection(db, 'members'), where(FieldPath.documentId(), 'in', member_id_array))
      const members_doc_array = await getDocs(q2)
      const members = {}
      members_doc_array.forEach((doc) => {
        members[doc.id] = doc.data()
      })
      res.status(200).json(members)
    }
    res.status(400).end()
  } catch (e) {
    res.status(400).end()
  }
}
