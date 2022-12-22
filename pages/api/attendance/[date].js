import { collection, query, where, getDocs } from 'firebase/firestore'

import { db } from '../../../utils/firestore'

export default async (req, res) => {
  const { date } = req.query

  if (req.method !== 'GET') {
    res.status(400).end()
  }

  try {
    const q = query(collection(db, 'attendance'), where('date', '==', date))
    const attendance_result = await getDocs(q)
    const attendance_array = attendance_result.docs.map((attendance) => attendance.data().member_id)
    res.status(200).json(attendance_array)
  } catch (e) {
    res.status(400).end()
  }
}
