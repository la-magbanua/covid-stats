import useSWR from 'swr'
import styled, { css } from 'styled-components'
import { AiOutlineMedicineBox, AiOutlineGlobal } from 'react-icons/ai'
import { RiSkullFill } from 'react-icons/ri'
import Heading from './heading'
import StatGrid from './stat-grid'
import StatItem from './stat-item'
import SkeletonLoader from './skeleton-loader'

const StyledGlobalStats = styled.div`
  padding: 2rem 0;
  margin-bottom: 3rem;
`

const fetcher = (...args) => fetch(...args).then(res => res.json())

export default function GlobalStats() {
  const { data, error } = useSWR(`https://disease.sh/v3/covid-19/all`, fetcher)

  if (error) return <div>failed loading data</div>

  if (!data && !error) return <SkeletonLoader />

  return (
    <StyledGlobalStats>
      <Heading>Global</Heading>
      <StatGrid>
        <StatItem total>
          <div>
            <span>
              <AiOutlineGlobal size="2rem" />
            </span>
            <h3>Total Cases</h3>
            <p>{data.cases.toLocaleString()}</p>
          </div>
        </StatItem>
        <StatItem recovered>
          <div>
            <span>
              <AiOutlineMedicineBox size="2rem" />
            </span>
            <h3>Recovered</h3>
            <p>{data.recovered.toLocaleString()}</p>
          </div>
        </StatItem>
        <StatItem deaths>
          <div>
            <span>
              <RiSkullFill size="2rem" />
            </span>
            <h3>Deaths</h3>
            <p>{data.deaths.toLocaleString()}</p>
          </div>
        </StatItem>
      </StatGrid>
    </StyledGlobalStats>
  )
}
