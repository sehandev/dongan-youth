import Attendance from '../components/attendance'
import Container from '../components/container'
import Sidebar from '../components/sidebar'
import Header from '../components/header'

export default function IndexPage() {
  return (
    <Container>
      <Sidebar />
      <Header>
        <Attendance />
      </Header>
    </Container>
  )
}
