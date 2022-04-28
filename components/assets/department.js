const department_info = {
  1: '청소년 1부',
  2: '청소년 1부+',
  3: '청소년 2부',
  4: '청소년 3부',
}

export const get_department_name = (department_id) => {
  return department_info[department_id]
}
