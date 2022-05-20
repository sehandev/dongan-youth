import { getConnection } from "oracledb"

async function insert_students(connection, student_info) {
  const query = `
      INSERT INTO STUDENTS
        (student_id, student_name, sex, student_state, address, birthday)
      VALUES(
        '${student_info.id}',
        '${student_info.name}',
        '${student_info.sex}',
        '1',
        '임시 주소',
        TO_DATE('1970-01-01', 'yyyy-mm-dd')
      )
  `
  const insert_result = await connection.execute(query, [], {
    autoCommit: true,
  })
  return insert_result
}

async function insert_belong_to(connection, student_info) {
  const query = `
      INSERT INTO BELONG_TO
        (student_id, my_group, grade, my_class)
      VALUES(
        ${student_info.id},
        ${student_info.group},
        ${student_info.grade},
        ${student_info.class}
      )
  `
  const insert_result = await connection.execute(query, [], {
    autoCommit: true,
  })
  return insert_result
}

export default async function update_attendance_api(req, res) {
  const connection = await getConnection({
    user: process.env.ORACLEDB_USER,
    password: process.env.ORACLEDB_PASSWORD,
    connectString: process.env.ORACLEDB_CONNECT_STRING,
  })

  const { body, method } = req

  switch (method) {
    case "POST":
      const insert_students_result = await insert_students(connection, body)
      const insert_belong_to_result = await insert_belong_to(connection, body)
      res.status(200).json({
        insert_students_result,
        insert_belong_to_result,
        message: "SUCCESS: Register new student",
      })
      break
    default:
      res.setHeader("Allow", ["POST"])
      res.status(405).end(`Method ${method} Not Allowed`)
  }

  try {
    await connection.close()
  } catch (error) {
    console.log(error)
  }
}
