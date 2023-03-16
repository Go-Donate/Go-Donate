import { Link } from "react-router-dom";
import styled from "styled-components";

export const MainContainerRegister = styled.main`
  background-color: var(--secondary-color);

  height: 100vh;
  overflow: auto;

  span {
    color: var(--white);
    font-size: .6rem;
  }

  section {
    img {
      display: none;
    }
  }

  @media (min-width: 1024px) {
    display: flex;
    padding: 2rem 3rem;

    section {
      display: flex;
      flex-direction: column;
      gap: 2rem;
      
      img {
        display: block;
        width: 60%;
        margin: 0 auto;
      }

      width: 60%;
      overflow: hidden;
    }
  }
`;

export const ContainerSideForm = styled.div`
  height: max-content;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 16px;

  > h2 {
    color: white;
    font-size: 1rem;
  }
`;

export const FormRegister = styled.form`
  display: flex;
  flex-direction: column;
  gap: .5rem;

  select {
    background-color: var(--inputs-color);
    border: none;
    flex: 1;
    padding: 0px 18px;
    font-size: 18px;
    color: var(--gray-30);
    padding: 16px;
    border-radius: 8px;

    option {
      color: var(--gray-30);
    }
  }
`;

export const ButtonCadastrar = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  
  background-color: var(--gray-20);
  padding: 16px 0;
  border-radius: 8px;
  color: white;

  font-weight: 500;
   span {
     font-size: .9rem;
   }

  transition: .3s ease;

  :hover {
    background-color: var(--primary-color);
  }
`

export const LinkButton = styled(Link)`
  background-color: var(--primary-color);

  display: flex;
  align-items: center;
  justify-content: center;

  padding: 1rem;

  border-radius: 8px;
  color: white;

  font-weight: 500;
  font-size: .9rem;

  transition: .3s ease;

  :hover {
    background-color: var(--button-initial);
  }
`
