import styled, { css, keyframes } from 'styled-components'
import StatGrid from './stat-grid'

const pulse = keyframes`
  0% {
      background-position: 0% 0%;
    }
    100% {
      background-position: -135% 0%;
    }
`

const StyledLoader = styled.div`
  margin-top: 2.5rem;
  margin-bottom: 2.5rem;

  .block {
    background: ${({ theme }) => theme.colors.sgradient};
    background-size: 400% 400%;
    border-radius: 20px;
    animation: ${pulse} 1.2s ease-in-out infinite;
  }

  .big {
    grid-area: total;
    width: 100%;
    height: 150px;
  }

  .mini {
    width: 100%;
    height: 120px;

    &.one {
      grid-area: recovered;
    }

    &.two {
      grid-area: deaths;
    }
  }
`

const SkeletonHeader = styled.div`
  background: ${({ theme }) => theme.colors.sgradient};
  background-size: 400% 400%;
  border-radius: 20px;
  height: 30px;
  width: 200px;
  margin-bottom: 2rem;
  border-radius: 10px;
  animation: ${pulse} 1.2s ease-in-out infinite;
  ${props =>
    props.noHeader &&
    css`
      display: none;
    `};
`

export default function SkeletonLoader({ ...props }) {
  return (
    <StyledLoader {...props}>
      <SkeletonHeader {...props} />
      <StatGrid>
        <div className="block big"></div>
        <div className="block mini one"></div>
        <div className="block mini two"></div>
      </StatGrid>
    </StyledLoader>
  )
}
