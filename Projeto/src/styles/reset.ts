import { createGlobalStyle } from "styled-components";

const Reset = createGlobalStyle`
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@100;200;300;400;500;600;700;800;900&display=swap');

  * {
    padding: 0;
    margin: 0;
    box-sizing: border-box;
    font-family: 'Inter', sans-serif
  }

  a {
    color: #FFFFFF;
    text-decoration: none;
  }

  button {
    cursor: pointer;
    border: none;
  }

  input, select {
    outline: none;
  }

  ul, ol, li {
    list-style: none;
  }
`;

export default Reset;
