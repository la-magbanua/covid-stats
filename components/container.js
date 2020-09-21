import styled from 'styled-components'

const StyledContainer = styled.div`
  max-width: 600px;
  margin: 0 auto;

  @media screen and (max-width: 420px) {
    padding: 0 1.15rem;
  }
`

export default function Container({ children, ...props }) {
  return <StyledContainer {...props}>{children}</StyledContainer>
}
