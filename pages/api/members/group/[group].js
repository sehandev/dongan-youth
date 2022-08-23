import db from '../../../../utils/firestore'

export default async (req, res) => {
  const { group } = req.query
  try {
    const members = await db.collection('members').where('state', '==', true).where('group', '==', group).get()
    const member_array = members.docs.map((member) => ({
      id: member.id,
      ...member.data(),
    }))
    res.status(200).json(member_array)
  } catch (e) {
    res.status(400).end()
  }
}
