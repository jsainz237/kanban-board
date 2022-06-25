import type { AppProps } from 'next/app'
import { ThemeProvider } from 'styled-components';
import { SSRProvider } from 'react-bootstrap';
import { Provider as ReduxProvider } from 'react-redux';
import { config } from '@fortawesome/fontawesome-svg-core';
import '@fortawesome/fontawesome-svg-core/styles.css'

import { store } from '../state';
import { GlobalStyle, theme } from '../styles/theme';
import '../styles/globals.scss'

config.autoAddCss = false;

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <SSRProvider>
      <ReduxProvider store={store}>
        <ThemeProvider theme={theme}>
          <GlobalStyle />
          <Component {...pageProps} />
        </ThemeProvider>
      </ReduxProvider>
    </SSRProvider>
  );
}

export default MyApp
