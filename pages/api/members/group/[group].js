import { collection, query, where, getDocs } from 'firebase/firestore'

import { db } from '../../../../utils/firestore'

export default async (req, res) => {
  const { group } = req.query
  try {
    const q = query(collection(db, 'members'), where('state', '==', true), where('group', '==', group))
    const members = await getDocs(q)
    const member_array = members.docs.map((member) => ({
      id: member.id,
      ...member.data(),
    }))
    res.status(200).json(member_array)
  } catch (e) {
    res.status(400).end()
  }
}
