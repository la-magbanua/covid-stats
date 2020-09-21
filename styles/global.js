import { createGlobalStyle } from 'styled-components'
import { normalize } from 'styled-normalize'

export const GlobalStyles = createGlobalStyle`
  ${normalize}

  html {
    height: 100%;
    font-family: 'Inter', --apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
  }

  body {
    height: 100%;
    background: ${({ theme }) => theme.colors.bg};
  }

  #__next {
    min-height: 100vh;
    display: flex;
    flex-direction: column;
  }

  main {
    flex: 1;
    padding-bottom: 5rem;
  }

  a {
    text-decoration: none;
    color: ${({ theme }) => theme.colors.grey};
  }
`
