import Container from '../../../components/container'
import Header from '../../../components/header'
import Members from '../../../components/members'
import Sidebar from '../../../components/sidebar'

export default function MembersPage() {
  return (
    <Container>
      <Sidebar />
      <Header>
        <Members />
      </Header>
    </Container>
  )
}
