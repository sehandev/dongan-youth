import Admin from '../../components/admin'
import Container from '../../components/container'
import Header from '../../components/header'
import Sidebar from '../../components/sidebar'

export default function IndexPage() {
  return (
    <Container>
      <Sidebar />
      <Header>
        <Admin />
      </Header>
    </Container>
  )
}
