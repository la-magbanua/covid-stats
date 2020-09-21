import Head from 'next/head'
import Footer from './footer'
import Header from './header'

export default function Layout({ children }) {
  return (
    <>
      <Head>
        <title>Covid Stats</title>
        <meta
          name="description"
          content="Website that shows covid-19 stats from around the globe."
        />
        <meta name="author" content="L.A. Magbanua" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      <main>{children}</main>
      <Footer />
    </>
  )
}
