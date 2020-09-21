import Link from 'next/link'
import styled, { keyframes } from 'styled-components'
import Container from './container'

const animate = keyframes`
 to {
    background-position: 100%;
  }
`

const Brand = styled.h1`
  a {
    font-size: 2.5rem;
    font-weight: ${({ theme }) => theme.fontWeights.black};
    background: #12c2e9;
    background: ${({ theme }) => theme.colors.wgradient};
    background: ${({ theme }) => theme.colors.gradient};
    -webkit-background-clip: text;
    background-clip: text;
    -webkit-text-fill-color: transparent;
    background-size: 300% auto;
    animation: ${animate} 7s ease-in-out infinite alternate;
  }
`

export default function Header() {
  return (
    <header>
      <Container>
        <Brand>
          <Link href="/">
            <a>Covid Stats</a>
          </Link>
        </Brand>
      </Container>
    </header>
  )
}
