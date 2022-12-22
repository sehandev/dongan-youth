import { useSelector } from 'react-redux'

import { Headline } from '../common'
import { DateSelectBox } from '../date_select'
import { useAttendanceByDate, useMembers } from '../swr'
import MembersCard from './members'
import RegisterCard from './register'
import StatisticsCard from './statistics'
import TrainingsCard from './trainings'

const Admin = () => {
  const date = useSelector((state) => state.date_checker.start_date)
  const current_group = useSelector((state) => state.group_manager.group)
  const { member_array } = useMembers(current_group)
  const { attendance_array } = useAttendanceByDate(date)

  return (
    <>
      <Headline className="mb-4">관리 페이지</Headline>
      <DateSelectBox />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <StatisticsCard attendance_array={attendance_array} member_array={member_array} />
        <RegisterCard />
        <MembersCard member_array={member_array} />
        <TrainingsCard />
      </div>
    </>
  )
}

export default Admin
