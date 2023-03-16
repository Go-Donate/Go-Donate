import styled from "styled-components";

export const Loadingg = styled.div`
  @keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
} 

  border: 2px solid #f3f3f3;
  border-top: 2px solid #3498db;
  border-radius: 50%;
  width: 20px;
  height: 20px;
  animation: spin .7s linear infinite;

  display: flex;
  justify-content: center;
  align-items: center;
`