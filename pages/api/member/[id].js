import { FieldValue } from 'firebase-admin/firestore'

import db from '../../../utils/firestore'

export default async (req, res) => {
  const { id } = req.query

  try {
    if (req.method === 'PUT') {
      await db
        .collection('members')
        .doc(id)
        .update({
          ...req.body,
          updated: FieldValue.serverTimestamp(),
        })
    } else if (req.method === 'GET') {
      const doc = await db.collection('members').doc(id).get()
      if (!doc.exists) {
        res.status(404).end()
      } else {
        res.status(200).json(doc.data())
      }
    } else if (req.method === 'DELETE') {
      await db.collection('members').doc(id).update({
        state: false,
        updated: FieldValue.serverTimestamp(),
      })
    }
    res.status(200).end()
  } catch (e) {
    res.status(400).end()
  }
}
