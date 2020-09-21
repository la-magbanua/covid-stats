import styled from 'styled-components'

export const StyledHeading = styled.h2`
  font-size: 2rem;
  font-weight: ${({ theme }) => theme.fontWeights.black};
  color: ${({ theme }) => theme.colors.offwhite};
  text-transform: uppercase;

  @media screen and (max-width: 420px) {
    font-size: 1.8rem;
  }
`

export default function Heading({ children, ...props }) {
  return <StyledHeading {...props}>{children}</StyledHeading>
}
