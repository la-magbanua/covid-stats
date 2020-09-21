import styled from 'styled-components'
import Container from './container'

const FooterDetails = styled.p`
  text-align: center;
  color: ${({ theme }) => theme.colors.lightgrey};
  font-size: 13px;
  opacity: 60%;
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
