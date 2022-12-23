import moment from 'moment'

const START_DATE = '2022-05-08'

const find_first_sunday = (start_date) => {
  let first_sunday
  Array(7)
    .fill()
    .map((_, i) => {
      const tmp_date = moment(start_date)
      tmp_date.add(i, 'days')
      if (tmp_date.day() === 0) {
        first_sunday = tmp_date
      }
    })
  return first_sunday
}

export const get_date_array = () => {
  const today = moment()
  const sunday_date = find_first_sunday(START_DATE)
  const sunday_array = []
  while (sunday_date.isSameOrBefore(today)) {
    sunday_array.push(sunday_date.format('YYYY-MM-DD'))
    sunday_date.add(7, 'days')
  }

  return sunday_array.reverse()
}
