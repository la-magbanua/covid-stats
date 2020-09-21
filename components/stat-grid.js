import styled from 'styled-components'

const StyledStatGrid = styled.div`
  display: grid;
  grid-template-areas:
    'total total'
    'recovered deaths';
  grid-gap: 2.5rem;

  @media screen and (max-width: 420px) {
    grid-gap: 1.5rem;
  }
`

export default function StatGrid({ children, ...props }) {
  return <StyledStatGrid {...props}>{children}</StyledStatGrid>
}
