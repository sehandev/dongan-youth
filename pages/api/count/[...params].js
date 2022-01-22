import { getConnection } from 'oracledb'

function make_metaData(metaData) {
  let list_metadata = []
  for (let i = 0; i < metaData.length; i++) {
    list_metadata.push(Object.values(metaData[i]).toString())
  }
  return list_metadata
}

function result_query(query_result, num, request_item_list) {
  // input = [부서, 학년, 반, 성별, 기간]
  const num_data = query_result.rows[num]
  const list_metadata = make_metaData(query_result.metaData)
  let return_query_result = []
  let information_index

  for (let i = 0; i < request_item_list.length; i++) {
    information_index = list_metadata.indexOf(request_item_list[i])
    if (information_index != -1)
      return_query_result.push(num_data[information_index])
  }
  return return_query_result
}

async function attendance_gender(connection, group_id, start_date, end_date) {
  //   let query = "SELECT * FROM STUDENTS"
  let start_date = '2022-01-22'
  let last_date = '2022-01-23'
  let query = `SELECT COUNT(*) FROM BELONG_TO B \
		WHERE B.my_group = '2' and B.grade = '1' and B.my_class = '2' and B.sex = 'F' \
		and B.student_id IN ( \
			SELECT student_id \
 			FROM attendance \
			WHERE attendance_date BETWEEN TO_DATE(${start_date}, 'YYYY-MM-DD') \
							   AND TO_DATE('${last_date}', 'YYYY-MM-DD')\
		);`

  const query_result = await connection.execute(query, [])
  const result = result_query(query_result)

  return result
}

let connection

export default async function helloAPI(req, res) {
  if (!connection) {
    connection = await getConnection({
      user: process.env.ORACLEDB_USER,
      password: process.env.ORACLEDB_PASSWORD,
      connectString: process.env.ORACLEDB_CONNECT_STRING,
    })
  }

  const { params } = req.query
  // params: [group_id, start_date, end_date]

  const compiled_result = await attendance_gender(connection, ...params)
  res.status(200).json(compiled_result)
}
