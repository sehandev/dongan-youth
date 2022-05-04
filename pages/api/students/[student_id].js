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

const convert_birthday = (birthday) => {
  const year = birthday.getFullYear()
  const month = birthday.getMonth() + 1
  const date = birthday.getDate()

  return `${year}년 ${month}월 ${date}일`
}

export default async function students_api(req, res) {
  const connection = await getConnection({
    user: process.env.ORACLEDB_USER,
    password: process.env.ORACLEDB_PASSWORD,
    connectString: process.env.ORACLEDB_CONNECT_STRING,
  })

  const { student_id } = req.query

  const result = await select_student(connection, student_id)
  if (result.rows.length === 0) {
    throw new Error(`FAIL select_student student_id: ${student_id}`)
  }
  const new_result = {
    id: result.rows[0][0],
    name: result.rows[0][1],
    sex: result.rows[0][2],
    state: result.rows[0][3],
    address: result.rows[0][4],
    home_number: result.rows[0][5],
    phone_number: result.rows[0][6],
    email: result.rows[0][7],
    birthday: convert_birthday(result.rows[0][8]),
  }
  res.status(200).json(new_result)

  try {
    await connection.close()
  } catch (error) {
    console.log(error)
  }
}
