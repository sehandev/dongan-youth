import { getConnection } from 'oracledb'

function make_attendance_query(
  group_id,
  grade,
  class_id,
  start_date,
  end_date
) {
  const male_query = `
    SELECT count(*) 
    FROM ATTENDANCE A
    WHERE A.student_id IN(
      SELECT student_id
      FROM BELONG_TO B
      WHERE 
        B.my_group = '${group_id}' 
        AND B.grade = '${grade}' 
        AND B.my_class = '${class_id}' 
        AND B.sex = 'M'
        AND attendance_date BETWEEN TO_DATE('${start_date}', 'YYYY-MM-DD') 
                            AND TO_DATE('${end_date}', 'YYYY-MM-DD')
    )
  `

  const female_query = `
    SELECT count(*) 
    FROM ATTENDANCE A
    WHERE A.student_id IN(
      SELECT student_id
      FROM BELONG_TO B
      WHERE 
        B.my_group = '${group_id}' 
        AND B.grade = '${grade}' 
        AND B.my_class = '${class_id}' 
        AND B.sex = 'F'
        AND attendance_date BETWEEN TO_DATE('${start_date}', 'YYYY-MM-DD') 
                            AND TO_DATE('${end_date}', 'YYYY-MM-DD')
    )
  `
  return [male_query, female_query]
}

async function attendance_gender(connection, group_id, start_date, end_date) {
  // 1학년 : 0123, 2학년 : 0123, 3학년 : 0123, 교사(0학년 0반)
  // 전체 남, 여, 교사 출석

  const class_arr = [0, 3, 3, 3]
  let attendance_statistics_result = [] // [학년][반]{성별}
  let total_male = 0
  let total_female = 0

  for (let grade = 0; grade < 4; grade++) {
    // 0학년(교사), 1학년, 2학년, 3학년 [0~3][]{}
    let grade_result = []
    for (let class_id = 0; class_id < class_arr[grade] + 1; class_id++) {
      // 반 수 : [0~3][0~max_class_id]{}
      let [male_query, female_query] = make_attendance_query(
        group_id,
        grade,
        class_id,
        start_date,
        end_date
      )
      let male_query_result = await connection.execute(male_query, [])
      let female_query_result = await connection.execute(female_query, [])

      // 성별 : [0~3][0~max_class_id]{'M' or 'F'}
      let class_result = {}
      class_result['M'] = male_query_result.rows[0][0]
      class_result['F'] = female_query_result.rows[0][0]

      grade_result[class_id] = class_result
      total_male += class_result['M']
      total_female += class_result['F']
    }
    attendance_statistics_result[grade] = grade_result
  }

  return [total_male, total_female, attendance_statistics_result]
}

export default async function helloAPI(req, res) {
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
