import { getConnection } from 'oracledb'

async function insert_attendance(connection, student_id, current_date) {
  const query = `
    INSERT INTO ATTENDANCE
    VALUES (
      ${student_id},
      TO_TIMESTAMP('${current_date} 12:00:00', 'YYYY-MM-DD HH24:MI:SS')
    )
  `
  const insert_result = await connection.execute(query, [], {
    autoCommit: true,
  })
  return insert_result
}

async function delete_attendance(connection, student_id, current_date) {
  const query = `
    DELETE FROM ATTENDANCE
    WHERE
      student_id = '${student_id}'
      AND attendance_date = TO_TIMESTAMP('${current_date} 12:00:00', 'YYYY-MM-DD HH24:MI:SS')
  `
  const delete_result = await connection.execute(query, [], {
    autoCommit: true,
  })
  return delete_result
}

let connection

export default async function update_attendance_api(req, res) {
  if (!connection) {
    connection = await getConnection({
      user: process.env.ORACLEDB_USER,
      password: process.env.ORACLEDB_PASSWORD,
      connectString: process.env.ORACLEDB_CONNECT_STRING,
    })
  }

  const {
    query: { params },
    method,
  } = req

  const [student_id, current_date] = params
  // student_id example: '51232'
  // current_date example: '2022-01-23'

  switch (method) {
    case 'POST':
      const insert_result = await insert_attendance(
        connection,
        student_id,
        current_date
      )
      res.status(200).json({
        student_id,
        message: 'SUCCESS: Insert attendance',
        insert_result,
      })
      break
    case 'DELETE':
      const delete_result = await delete_attendance(
        connection,
        student_id,
        current_date
      )
      res.status(200).json({
        student_id,
        message: 'SUCCESS: Delete attendance',
        delete_result,
      })
      break
    default:
      res.setHeader('Allow', ['POST', 'DELETE'])
      res.status(405).end(`Method ${method} Not Allowed`)
  }

  try {
    await connection.close()
  } catch (error) {
    console.log(error)
  }
}
