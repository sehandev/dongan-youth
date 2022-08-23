import { useRouter } from 'next/router'

import Container from '../../../../components/container'
import Header from '../../../../components/header'
import Member from '../../../../components/member'
import Sidebar from '../../../../components/sidebar'

export default function MemberPage() {
  const router = useRouter()
  const { id } = router.query

  return (
    <Container>
      <Sidebar />
      <Header>{id && <Member id={id} />}</Header>
    </Container>
  )
}
