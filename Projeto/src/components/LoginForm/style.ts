import { Link } from "react-router-dom";
import styled from "styled-components";

export const MainContainerLogin = styled.div`
  background-color: var(--secondary-color);
  height: 100vh;
  overflow: auto;

  section {
    img {
      display: none;
    }
  }

  @media (min-width: 1024px) {
    display: flex;

    section {
      img {
        display: block;
        height: 100%;
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
  gap: 2rem;
  margin: auto auto;

  > h2 {
    color: white;
    font-size: 1rem;
  }

  @media (min-width: 1024px) {
    display: flex;
    align-items: center;
    justify-content: center;
  }
`;

export const FormLogin = styled.form`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

export const ButtonLogin = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  
  background-color: var(--primary-color);
  padding: 16px 0;
  border-radius: 8px;
  color: white;

  font-weight: 500;
  font-size: 16px;

  transition: .4s ease;

  :hover {
    background-color: var(--button-initial);
  }
`;

export const LinkCreateAccount = styled(Link)`
  background-color: var(--gray-20);

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
`;
