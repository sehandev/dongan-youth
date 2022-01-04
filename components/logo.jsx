import styled from 'styled-components'
import Image from 'next/image'

const LogoText = styled.div`
  font-weight: 900;
  font-size: 30px;
`

const Logo = ({ className }) => {
  return (
    <span className={`flex items-center ${className}`}>
      <Image src='/img/dongan.png' alt='dongan' width={40} height={40}></Image>
      <LogoText className='ml-2'>AGGA</LogoText>
    </span>
  )
}

export default Logo
