import { FieldPath } from 'firebase-admin/firestore'

import db from '../../../../utils/firestore'

export default async (req, res) => {
  const { id } = req.query

  try {
    if (req.method === 'GET') {
      const trainings_doc_array = await db.collection('trainings').where('member_id', '==', id).get()
      const trainings = {}
      trainings_doc_array.forEach((doc) => {
        const { name, date } = doc.data()
        trainings[name] = date
      })
      res.status(200).json(trainings)
    }
    res.status(400).end()
  } catch (e) {
    res.status(400).end()
  }
}
