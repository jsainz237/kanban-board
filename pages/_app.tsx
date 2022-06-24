import type { AppProps } from 'next/app'
import { ThemeProvider } from 'styled-components';
import { SSRProvider } from 'react-bootstrap';
import { config } from '@fortawesome/fontawesome-svg-core';
import '@fortawesome/fontawesome-svg-core/styles.css'

import { GlobalStyle, theme } from '../styles/theme';
import '../styles/globals.scss'

config.autoAddCss = false;

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <SSRProvider>
        <ThemeProvider theme={theme}>
          <GlobalStyle />
          <Component {...pageProps} />
        </ThemeProvider>
    </SSRProvider>
  );
}

export default MyApp
