import { getConnection } from 'oracledb'

async function select_student(connection, student_id) {
  const query = `
    SELECT *
    FROM STUDENTS S
    WHERE S.student_id = ${student_id}
  `
  const result = await connection.execute(query, [])
  return result
}

export default async function students_api(req, res) {
  const connection = await getConnection({
    user: process.env.ORACLEDB_USER,
    password: process.env.ORACLEDB_PASSWORD,
    connectString: process.env.ORACLEDB_CONNECT_STRING,
  })

  const {
    query: { params },
    method,
  } = req

  const [student_id] = params
  // student_id example: '99999'

  switch (method) {
    case 'GET':
      const result = await select_student(connection, student_id)
      if (result.rows.length === 0) {
        throw new Error(`FAIL select_student student_id: ${student_id}`)
      }
      const new_result = {
        id: result.rows[0][0],
        name: result.rows[0][1],
        sex: result.rows[0][2],
        state: result.rows[0][3],
        birthday: result.rows[0][4],
        address: result.rows[0][5],
        home_number: result.rows[0][6],
        phone_number: result.rows[0][7],
        email: result.rows[0][8],
      }
      res.status(200).json(new_result)
      break
    default:
      res.setHeader('Allow', ['GET'])
      res.status(405).end(`Method ${method} Not Allowed`)
  }

  try {
    await connection.close()
  } catch (error) {
    console.log(error)
  }
}
