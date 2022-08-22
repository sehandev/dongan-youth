import Sidebar from '../../../components/sidebar'
import Container from '../../../components/container'
import Header from '../../../components/header'
import Members from '../../../components/members'

export default function RegisterPage() {
  return (
    <Container>
      <Sidebar />
      <Header>
        <Members />
      </Header>
    </Container>
  )
}
