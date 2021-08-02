import { createGlobalStyle } from 'styled-components/macro';

const GlobalStyle = createGlobalStyle`
  * {
    padding: 0;
    margin: 0;
    box-sizing: border-box;
  }

  body, html, #root {
    height: 100%;
    background-attachment: fixed;
    background-color: #FAACA8;
    background-image: linear-gradient(19deg, #FAACA8 0%, #DDD6F3 100%);
    font-family: 'Roboto', sans-serif;
  }

  a {
    text-decoration: none;
  }
`;

export default GlobalStyle;
