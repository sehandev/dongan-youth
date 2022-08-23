import db from '../../../utils/firestore'

export default async (req, res) => {
  try {
    const attendance = await db.collection('attendance').where('date', '==', req.body.date).where('member_id', '==', req.body.member_id).get()
    if (req.method == 'POST') {
      if (0 < attendance.docs.length) {
        res.status(404).end()
      } else {
        const { id } = await db.collection('attendance').add({
          ...req.body,
        })
        res.status(200).json({ id })
      }
    } else if (req.method == 'DELETE') {
      if (attendance.docs.length === 0) {
        res.status(404).end()
      } else {
        await db.collection('attendance').doc(attendance.docs[0].id).delete()
        res.status(200).end()
      }
    }
  } catch (e) {
    console.error(e)
    res.status(400).end()
  }
}
