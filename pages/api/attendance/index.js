import db from '../../../utils/firestore'

export default async (req, res) => {
  if (req.method !== 'POST') {
    res.status(400).end()
  }
  try {
    const attendance = await db
      .collection('attendance')
      .where('date', '==', req.body.date)
      .where('member_id', '==', req.body.member_id)
      .get()
    if (0 < attendance.docs.length) {
      res.status(404).end()
    } else {
      const { id } = await db.collection('attendance').add({
        ...req.body,
      })
      res.status(200).json({ id })
    }
  } catch (e) {
    console.error(e)
    res.status(400).end()
  }
}
