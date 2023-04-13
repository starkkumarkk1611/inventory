import styled, {keyframes} from "styled-components";

const scaleAnimation = keyframes`
    50% {
      transform: scale(1.02);
    }

    100% {
      transform: scale(1);
    }
`;

const SettingsComponent = styled.div`
  max-width: 1100px;
  margin: auto;
  padding: 3.8rem 2rem 0 2rem;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;

  .get-started {
    display: inline-block;
    margin: 0 auto;
    margin-top: 3.5rem;
    border-radius: 35px;
    padding: 1rem;
    border: none;
    cursor: pointer;
    background: #f86150;
    color: white;
    font-size: 1rem;
    font-weight: 500;
    text-decoration: none;
    transition: ease-in-out transform 0.5s;
    animation: ${scaleAnimation} 1s ease-in-out infinite;
  }
`;

export default SettingsComponent;
