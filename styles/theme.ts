import { createGlobalStyle } from 'styled-components';

export const GlobalStyle = createGlobalStyle`
  html,
  body {
    padding: 0;
    margin: 0;
    font-family: ${({ theme }) => theme.fontFamily.text};
    background-color: ${({ theme }) => theme.colors.backgroundColor};
  }

  h1, h2, h3, h4, h5, h6 {
    font-family: ${({ theme }) => theme.fontFamily.header};
    margin: 0;
  }

  a {
    color: inherit;
    text-decoration: none;
  }

  * {
    color: ${({ theme }) => theme.colors.textColor};
    box-sizing: border-box;
  }
`;

export const theme = {
  colors: {
    backgroundColor: '#0d0d0d',
    textColor: '#a9b4bf',
    secondaryColor: '#1e252f',
  },
  fontFamily: {
    header: 'Arvo',
    text: 'Lato'
  },
}