import { FieldPath } from 'firebase-admin/firestore'

import db from '../../../../../utils/firestore'

export default async (req, res) => {
  const { name, date } = req.query

  try {
    if (req.method === 'GET') {
      const trainings_doc_array = await db
        .collection('trainings')
        .where('date', '==', date)
        .where('name', '==', name)
        .get()
      const member_id_array = []
      trainings_doc_array.forEach((doc) => {
        member_id_array.push(doc.data().member_id)
      })
      const members_doc_array = await db
        .collection('members')
        .where(FieldPath.documentId(), 'in', member_id_array)
        .get()
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
