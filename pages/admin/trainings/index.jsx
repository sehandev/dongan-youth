import Container from '../../../components/container'
import Header from '../../../components/header'
import Sidebar from '../../../components/sidebar'
import Trainings from '../../../components/trainings'

export default function MembersPage() {
  return (
    <Container>
      <Sidebar />
      <Header>
        <Trainings />
      </Header>
    </Container>
  )
}
