import { useRouter } from 'next/router'

import Attendance from '../../../components/attendance'
import Container from '../../../components/container'
import Header from '../../../components/header'
import Sidebar from '../../../components/sidebar'

export default function IndexPage() {
  const router = useRouter()
  const { grade_id, class_id } = router.query

  return (
    <Container>
      <Sidebar grade_id={grade_id} class_id={class_id} />
      <Header>
        <Attendance grade_id={grade_id} class_id={class_id} />
      </Header>
    </Container>
  )
}
