import styled from "styled-components";

const LoginComponent = styled.div`
  padding-top: 5rem;

  @media screen and (max-width: 480px) {
    padding-top: 8rem;
  }

  .helper-form-text {
    color: #888;
    text-align: center;
    margin: 0 auto;

    a {
      text-decoration: none;
      color: #b183fa;
    }
  }
`;
export default LoginComponent;
