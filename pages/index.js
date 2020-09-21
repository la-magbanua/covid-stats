import Container from 'components/container'
import Layout from 'components/layout'
import GlobalStats from 'components/global-stats'
import CountryStats from 'components/country-stats'

export default function Home() {
  return (
    <Layout>
      <Container>
        <GlobalStats />
        <CountryStats />
      </Container>
    </Layout>
  )
}
