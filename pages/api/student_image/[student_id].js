import { getConnection } from 'oracledb'

async function send_image(connection, student_id) {
  if (student_id == 99999) {
    return { path: '/student/99999/sample.jpg' }
  } else if (student_id == undefined) return
  else {
    return { path: '/img/default_student.png' }
  }
}

export default async function studentImageAPI(req, res) {
  const connection = await getConnection({
    user: process.env.ORACLEDB_USER,
    password: process.env.ORACLEDB_PASSWORD,
    connectString: process.env.ORACLEDB_CONNECT_STRING,
  })

  const { student_id } = req.query
  const compiled_result = await send_image(connection, student_id)
  res.status(200).json(compiled_result)

  try {
    await connection.close()
  } catch (error) {
    console.log(error)
  }
}
