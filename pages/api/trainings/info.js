import db from '../../../utils/firestore'

export default async (req, res) => {
  try {
    if (req.method === 'POST') {
      const { name, date_array } = req.body
      await db.collection('training').doc(name).set({ date_array })
      res.status(200).end()
    } else if (req.method === 'GET') {
      const doc_array = await db.collection('training').get()
      const info_array = []
      doc_array.forEach((doc) => {
        info_array.push({
          name: doc.id,
          ...doc.data(),
        })
      })
      res.status(200).json(info_array)
    } else if (req.method === 'PUT') {
      const { name, date_array } = req.body
      await db.collection('training').doc(name).update({
        date_array,
      })
      res.status(200).end()
    }
  } catch (e) {
    console.error(e)
    res.status(400).end()
  }
}
