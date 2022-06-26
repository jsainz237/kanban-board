import type { AppProps } from 'next/app'
import { ThemeProvider } from 'styled-components';
import { SSRProvider } from 'react-bootstrap';
import { Provider as ReduxProvider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react'
import { config } from '@fortawesome/fontawesome-svg-core';
import '@fortawesome/fontawesome-svg-core/styles.css'

import { persistor, store } from '../state';
import { GlobalStyle, theme } from '../styles/theme';
import '../styles/globals.scss'

config.autoAddCss = false;

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <SSRProvider>
      <ReduxProvider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <ThemeProvider theme={theme}>
            <GlobalStyle />
            <Component {...pageProps} />
          </ThemeProvider>
        </PersistGate>
      </ReduxProvider>
    </SSRProvider>
  );
}

export default MyApp
