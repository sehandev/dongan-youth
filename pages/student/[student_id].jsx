import { useRouter } from 'next/router'

import Container from '../../components/container'
import Sidebar from '../../components/sidebar'
import Student from '../../components/student'
import Header from '../../components/header'

export default function StatisticsPage() {
  const router = useRouter()
  const { student_id } = router.query

  return (
    <Container>
      <Sidebar />
      <Header>
        <Student student_id={student_id} />
      </Header>
    </Container>
  )
}
