import { useState, useMemo, useCallback } from 'react'
import useSWR from 'swr'
import styled from 'styled-components'
import { AiOutlineMedicineBox } from 'react-icons/ai'
import { RiSkullFill } from 'react-icons/ri'
import Chart from 'chart.js'
import Heading from './heading'
import StatGrid from './stat-grid'
import StatItem from './stat-item'
import SkeletonLoader from './skeleton-loader'

const SelectContainer = styled.div`
  margin-bottom: 3rem;

  select {
    cursor: pointer;
    width: 100%;
    border: none;
    color: ${({ theme }) => theme.colors.lightgrey};
    border: 3px solid;
    border-radius: 15px;
    border-image: linear-gradient(to right, #f64f59, #c471ed, #12c2e9) 1;
    font-size: 16px;
    -moz-appearance: none;
    -webkit-appearance: none;
    appearance: none;
    padding: 1.5rem 1rem;
    background: ${({ theme }) => theme.colors.bg};
  }
`

const ChartContainer = styled.div`
  margin-top: 3rem;
`

const RateContainer = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  margin-top: 3rem;

  div {
    border-radius: 20px;
    background: ${({ theme }) => theme.colors.itembg};
    padding: 1.5rem;
    width: 180px;

    h3 {
      margin-top: 0;
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

  @media screen and (max-width: 420px) {
    div {
      width: 100%;
    }

    div:first-child {
      margin-right: 1rem;
    }
  }
`

const fetcher = (...args) => fetch(...args).then(res => res.json())

export default function CountryStats() {
  const [country, setCountry] = useState('Philippines')
  const { data: geoIp } = useSWR(`https://freegeoip.app/json/`, fetcher)

  // set initial stats to be that of the user's country
  useMemo(() => {
    if (geoIp) {
      setCountry(geoIp.country_name)
    }
  }, [geoIp])

  const { data: countryData } = useSWR(
    () => `https://disease.sh/v3/covid-19/countries/${country}`,
    fetcher
  )
  const { data: countries, error } = useSWR(
    `https://disease.sh/v3/covid-19/countries`,
    fetcher
  )

  const elRef = useCallback(
    node => {
      if (node !== null) {
        fetch(
          `https://disease.sh/v3/covid-19/historical/${country}?lastdays=all`
        )
          .then(res => res.json())
          .then(data => {
            const ctx = node.getContext('2d')
            const gradient = ctx.createLinearGradient(0, 0, 0, 1000)
            gradient.addColorStop(0, '#0093E9')
            gradient.addColorStop(0.5, '#f6f7f8')

            // set chart instance
            new Chart(ctx, {
              type: 'line',
              data: {
                labels: Object.keys(data.timeline.cases),
                datasets: [
                  {
                    label: 'number of cases',
                    data: Object.values(data.timeline.cases),
                    borderColor: '#0093E9',
                    borderWidth: 4,
                    pointColor: '#fff',
                    pointStrokeColor: '#0093E9',
                    pointHighlightFill: '#fff',
                    pointHighlightStroke: '#0093E9',
                    backgroundColor: gradient,
                    pointRadius: 0,
                  },
                ],
              },
              options: {
                responsive: true,
                scales: {
                  yAxes: [
                    {
                      gridLines: {
                        color: '#1a1a1a',
                      },
                    },
                  ],
                  xAxes: [
                    {
                      gridLines: {
                        display: false,
                      },
                    },
                  ],
                },
              },
            })
          })
      }
    },
    [country]
  )

  if (error) return <div>failed to load list of countries</div>

  if (!error && !countries) return <div>loading countries...</div>

  let recoveryRate
  let deathRate

  if (countryData) {
    recoveryRate = Math.floor((countryData.recovered / countryData.cases) * 100)
    deathRate = Math.floor((countryData.deaths / countryData.cases) * 100)
  }

  return (
    <div>
      <Heading>By Country</Heading>
      <div>
        {/* country picker */}
        <SelectContainer>
          <select
            name="countries"
            id="countries"
            onChange={e => setCountry(e.target.value)}
          >
            <option value="" selected disabled hidden>
              Select country
            </option>
            {countries.map((countryItem, i) => (
              <option
                key={
                  countryItem.countryInfo._id ? countryItem.countryInfo._id : i
                }
                value={countryItem.country}
              >
                {countryItem.country}
              </option>
            ))}
          </select>
        </SelectContainer>
        {/* country stat details */}
        <div>
          {!countryData ? (
            <SkeletonLoader noHeader />
          ) : (
            <>
              <StatGrid>
                <StatItem total>
                  <div>
                    <span className="country-icon">
                      <img
                        src={countryData.countryInfo.flag}
                        alt={countryData.country}
                      />
                    </span>
                    <h3>Total cases</h3>
                    <p>{countryData.cases.toLocaleString()}</p>
                  </div>
                </StatItem>
                <StatItem recovered>
                  <div>
                    <span>
                      <AiOutlineMedicineBox size="2rem" />
                    </span>
                    <h3>Recovered</h3>
                    <p>{countryData.recovered.toLocaleString()}</p>
                  </div>
                </StatItem>
                <StatItem deaths>
                  <div>
                    <span>
                      <RiSkullFill size="2rem" />
                    </span>
                    <h3>Deaths</h3>
                    <p>{countryData.deaths.toLocaleString()}</p>
                  </div>
                </StatItem>
              </StatGrid>
              {/* chart */}
              <ChartContainer>
                <canvas id="line-chart" ref={elRef}></canvas>
              </ChartContainer>
              <RateContainer>
                <div>
                  <h3>Recovery rate</h3>
                  <p>{recoveryRate}%</p>
                </div>
                <div>
                  <h3>Death rate</h3>
                  <p>{deathRate}%</p>
                </div>
              </RateContainer>
            </>
          )}
        </div>
      </div>
    </div>
  )
}
