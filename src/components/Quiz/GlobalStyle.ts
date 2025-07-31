import { createGlobalStyle } from 'styled-components';
/* use public/assets images directly, so no imports needed */

export const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
    padding: 0;
    background-color: black;
    background-image: url('/assets/background-mobile.png');
    background-position: center top;
    background-size: 100% 100vh;
    background-repeat: no-repeat;
    font-family: 'Press Start 2P', monospace;
    transition: background-image 0.3s ease;
    position: relative;
    z-index: 0;
  }

  @media (min-width: 600px) {
    body {
      background-image: url('/assets/background-tablet.png');
      background-position: center top;
      background-size: 100% 100vh;
      background-repeat: no-repeat;
    }
  }

  @media (min-width: 1024px) {
    body {
      background-image: url('/assets/background-web.png');
      background-position: center top;
      background-size: 100% 100vh;
      background-repeat: no-repeat;
    }
  }

  @media (min-width: 1400px) {
    body {
      background-image: url('/assets/background-xxl.png');
      background-position: center top;
      background-size: 100% 100vh;
      background-repeat: no-repeat;
    }
  }
`;