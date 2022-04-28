const name_object = {
  1: '청소년 1부',
  2: '청소년 1부+',
  3: '청소년 2부',
  4: '청소년 3부',
}

export const get_group_name = (group_id) => {
  return name_object[group_id]
}
