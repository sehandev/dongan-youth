import { getConnection } from 'oracledb'

function make_attendance_query(
  group_id,
  grade,
  class_id,
  start_date,
  end_date
) {
  const query = `
  SELECT TMP.sex, COUNT(*)
  FROM ATTENDANCE A, 
  (SELECT student_id, sex
    FROM BELONG_TO B
    WHERE B.my_group = '${group_id}' AND B.grade = '${grade}' AND B.my_class = '${class_id}'
  ) TMP
  WHERE A.attendance_date BETWEEN TO_DATE('${start_date}', 'YYYY-MM-DD') 
        AND TO_DATE('${end_date}', 'YYYY-MM-DD')
        AND A.student_id = TMP.student_id
  GROUP BY TMP.sex
  `
  return query
}

async function attendance_teacher(connection, group_id, start_date, end_date) {
  let teacher_result = { M: 0, F: 0 }

  let attendance_query = make_attendance_query(
    group_id,
    0,
    0,
    start_date,
    end_date
  )
  let query_result = await connection.execute(attendance_query, [])
  if (query_result.rows.length == 0) {
  } else if (query_result.rows.length == 1) {
    teacher_result[query_result.rows[0][0]] += query_result.rows[0][1]
  } else {
    for (let i = 0; i < 2; i++) {
      teacher_result[query_result.rows[i][0]] += query_result.rows[i][1]
    }
  }
  return teacher_result
}

async function attendance_gender(connection, group_id, start_date, end_date) {
  // 1학년 : 0123, 2학년 : 0123, 3학년 : 0123, 교사(0학년 0반)
  // 전체 남, 여, 교사 출석
  const class_arr = [0, 3, 3, 3]
  let attendance_statistics_result = [] // [학년][반]{성별}
  let total_student = { M: 0, F: 0 }
  let teacher_result = await attendance_teacher(
    connection,
    group_id,
    start_date,
    end_date
  )

  attendance_statistics_result[0] = [teacher_result]

  for (let grade = 1; grade < 4; grade++) {
    let grade_result = []
    for (let class_id = 0; class_id < class_arr[grade] + 1; class_id++) {
      let attendance_query = make_attendance_query(
        group_id,
        grade,
        class_id,
        start_date,
        end_date
      )
      let query_result = await connection.execute(attendance_query, [])
      const query_rows = query_result.rows
      let class_result = { M: 0, F: 0 }
      //no-one attendance
      if (query_rows.length == 0) grade_result[class_id] = class_result
      else if (query_rows.length == 1) {
        //only male or only female
        class_result[query_rows[0][0]] = query_rows[0][1]
        total_student[query_rows[0][0]] += query_rows[0][1]
      } else {
        for (let i = 0; i < 2; i++) {
          //0:male, 1:female
          class_result[query_rows[i][0]] = query_rows[i][1]
          total_student[query_rows[i][0]] += query_rows[i][1]
        }
      }
      grade_result[class_id] = class_result
    }
    attendance_statistics_result[grade] = grade_result
  }
  return [total_student['M'], total_student['F'], attendance_statistics_result]
}

export default async function statisticsAPI(req, res) {
  const connection = await getConnection({
    user: process.env.ORACLEDB_USER,
    password: process.env.ORACLEDB_PASSWORD,
    connectString: process.env.ORACLEDB_CONNECT_STRING,
  })

  const { params } = req.query
  // params: [group_id, start_date, end_date]

  const compiled_result = await attendance_gender(connection, ...params)
  res.status(200).json(compiled_result)

  try {
    await connection.close()
  } catch (error) {
    console.log(error)
  }
}
