import styled, { css } from 'styled-components'

const StyledStatItem = styled.div`
  border-radius: 20px;
  background: ${({ theme }) => theme.colors.itembg};

  div {
    padding: 1.5rem;

    /* stat icon */
    span {
      color: ${({ theme }) => theme.colors.lightgrey};
    }

    span.country-icon {
      display: block;
      width: 60px;
      height: auto;

      img {
        width: 100%;
        height: auto;
      }
    }

    h3 {
      margin-bottom: 8px;
      font-weight: ${({ theme }) => theme.fontWeights.normal};
      color: ${({ theme }) => theme.colors.lightgrey};
      opacity: 87%;
      font-size: 14px;
    }

    p {
      margin-top: 0;
      margin-bottom: 0;
      font-weight: ${({ theme }) => theme.fontWeights.black};
      color: ${({ theme }) => theme.colors.offwhite};
      font-size: 1.2rem;
    }
  }

  ${props =>
    props.total &&
    css`
      grid-area: total;
      div {
        p {
          font-size: 1.8rem;
        }
      }
    `};

  ${props =>
    props.recovered &&
    css`
      grid-area: recovered;
    `};

  ${props =>
    props.deaths &&
    css`
      grid-area: deaths;
    `};
`

export default function StatItem({ children, ...props }) {
  return <StyledStatItem {...props}>{children}</StyledStatItem>
}
