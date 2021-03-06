import styled from 'styled-components'
import Image from 'next/image'
import Link from 'next/link'

const LogoText = styled.div`
  font-weight: 900;
  font-size: 20px;
`

const Logo = ({ className, onClick }) => {
  return (
    <Link href='/'>
      <a className={`flex items-center ${className}`} onClick={onClick}>
        <Image
          src='/img/dongan.png'
          alt='dongan'
          width={40}
          height={40}
        ></Image>
        <LogoText className='ml-2'>출석하는 동안</LogoText>
      </a>
    </Link>
  )
}

export default Logo
