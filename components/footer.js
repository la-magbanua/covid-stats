import styled from 'styled-components'
import Container from './container'

const FooterDetails = styled.p`
  text-align: center;
  color: ${({ theme }) => theme.colors.lightgrey};
  font-size: 13px;
  opacity: 60%;

  @media screen and (max-width: 420px) {
    font-size: 12px;
  }
`

export default function Footer() {
  return (
    <footer>
      <Container>
        <FooterDetails>Designed & Built by: L.A. Magbanua</FooterDetails>
      </Container>
    </footer>
  )
}
