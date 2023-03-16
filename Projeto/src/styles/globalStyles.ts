import { createGlobalStyle } from "styled-components";


const GlobalStyle = createGlobalStyle`

  :root {
    --primary-color: #12876E;
    --secondary-color: #0D3042;
    --button-initial: #357538;
    --button-cancel: #DC143C;
    --inputs-color: #232129;
    --gray-80: #28262E;
    --gray-60: #3E3B47;
    --gray-30: #666360;
    --gray-20: #999591;
    --white: #F4EDE8;

    --title-1: 1.5rem;
    --title-2: 1.25rem;
    --title-3: 1.125rem;

    --font-family: "Roboto Slab", sans-serif;
    --font-desktop: 1rem;
    --font-mobile: 0.875rem;
  }
 
  body {

    h1 {
    font-size: var(--title-1);
    font-weight: 700;
    }
    h2 {
      font-size: var(--title-2);
      font-weight: 600;
    }
    h3 {
      font-size: var(--title-3);
      font-weight: 500;
    }   
 
    font-size: var(--font-desktop);
    font-family: var(--font-family);
 
    min-height: max-content;
  }
`;

export default GlobalStyle;
