import { getConnection } from 'oracledb'

async function select_attendance(
  connection,
  group_id,
  grade_id,
  class_id,
  start_date,
  end_date
) {
  let query = `
    SELECT S.student_id, S.student_name, S.sex
    FROM belong_to B, students S
    WHERE
      B.student_id = S.student_id
      AND S.student_state=1
      AND B.my_group=${group_id}
      AND B.grade=${grade_id}
      AND B.my_class=${class_id}
  `
  const student_result = await connection.execute(query, [])

  const id_array = Array.from(student_result.rows, (x) => x[0])
  query = `
    SELECT student_id
    FROM attendance
    WHERE
      student_id IN('${id_array.join("','")}')
      AND attendance_date BETWEEN
        TO_DATE('${start_date}', 'YYYY-MM-DD') 
        AND TO_DATE('${end_date}', 'YYYY-MM-DD')
  `
  const attendance_result = await connection.execute(query, [])
  const attended_id_array = Array.from(attendance_result.rows, (x) => x[0])
  const student_array = Array.from(student_result.rows, (row) => {
    const student_id = row[0]
    let is_attended = 0
    if (attended_id_array.includes(student_id)) {
      is_attended = 1
    }
    return [...row, is_attended]
  })
  return student_array
}

export default async function attendanceAPI(req, res) {
  const connection = await getConnection({
    user: process.env.ORACLEDB_USER,
    password: process.env.ORACLEDB_PASSWORD,
    connectString: process.env.ORACLEDB_CONNECT_STRING,
  })

  const { params } = req.query
  // params: [group_id, grade_id, class_id, start_date, end_date]

  const attendance_data = await select_attendance(connection, ...params)
  res.status(200).json(attendance_data)

  try {
    await connection.close()
  } catch (error) {
    console.log(error)
  }
}
