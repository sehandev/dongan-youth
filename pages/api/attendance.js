import { getConnection } from 'oracledb'

function make_metaData(metaData) {
  let list_metadata = []
  for (let i = 0; i < metaData.length; i++) {
    list_metadata.push(Object.values(metaData[i]).toString())
  }
  return list_metadata
}

function result_query(query_result, num, request_item_list) {
  //배열 길이 : request_item_list.length
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

async function all_select(connection) {
  let query = 'SELECT * FROM STUDENTS'
  const query_result = await connection.execute(query, [])

  // TEST
  return query_result

  // const compiled_result = result_query(query_result, 0, [
  //   'STUDENT_NAME',
  //   'STUDENT_ID',
  // ])
  // return compiled_result
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

  const compiled_result = await all_select(connection)
  res.status(200).json(compiled_result)
}
