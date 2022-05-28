import { getConnection } from "oracledb"

const convert_date = (attendance_date) => {
  const year = attendance_date.getFullYear()
  let month = attendance_date.getMonth() + 1
  let date = attendance_date.getDate()

  month = month < 10 ? "0" + month : month
  date = date < 10 ? "0" + date : date
  return `${year}-${month}-${date}`
}

async function select_attendance(connection, student_id) {
  let query = `
    SELECT attendance_date
    FROM attendance
    WHERE
      student_id = ${student_id}
  `
  const attendance_result = await connection.execute(query, [])

  const attendance_array = Array.from(attendance_result.rows, (x) =>
    convert_date(x[0])
  )

  return attendance_array
}

export default async function attendanceAPI(req, res) {
  const connection = await getConnection({
    user: process.env.ORACLEDB_USER,
    password: process.env.ORACLEDB_PASSWORD,
    connectString: process.env.ORACLEDB_CONNECT_STRING,
  })

  const { student_id } = req.query

  const attendance_data = await select_attendance(connection, student_id)
  res.status(200).json(attendance_data)

  try {
    await connection.close()
  } catch (error) {
    console.log(error)
  }
}
