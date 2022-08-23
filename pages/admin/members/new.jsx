import Container from '../../../components/container'
import Header from '../../../components/header'
import Register from '../../../components/register'
import Sidebar from '../../../components/sidebar'

export default function RegisterPage() {
  return (
    <Container>
      <Sidebar />
      <Header>
        <Register />
      </Header>
    </Container>
  )
}
