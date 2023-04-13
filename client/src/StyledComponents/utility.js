import styled, { css } from "styled-components";

// Headers
export const HeaderOne = styled.h1`
  text-align: center;
  font-size: 2.5rem;

  @media (max-width: 780px) {
    font-size: 2.25rem;
  }

  @media (max-width: 500px) {
    font-size: 2rem !important;
  }

  ${(props) =>
    props.home &&
    css`
      /* margin-top: 10rem !important; */
      font-size: 3rem;
      margin-left: auto;
      margin-right: auto;
      margin-top: 0;
      max-width: 650px;

      @media (max-width: 780px) {
        font-size: 2.5rem;
        margin-bottom: 0.5rem;
      }
    `}

  img {
    height: 4em;
    aspect-ratio: 1;
    object-fit: contain;
  }
`;

export const HeaderTwo = styled.h2`
  font-size: 2rem;
  margin-top: 2rem;

  @media (max-width: 500px) {
    font-size: 1.8rem;
    margin-bottom: 0.5rem;
  }

  ${(props) =>
    props.home &&
    css`
      text-align: center;

      &:hover {
        /* background: lighten(#dc3545, 5%); */
      }
    `}
`;

// Features Click Paragraph(Home Page)
export const FeatureClickParagraph = styled.p`
  ${(props) =>
    props.clicked &&
    css`
      color: #2b2e94;
    `}
  img {
    display: none;
    ${(props) =>
      props.clicked &&
      css`
        display: inline;
      `}
  }
`;

// Features Opened Content(Home Page)
export const FeatureOpenedContent = styled.div`
  display: none;
  transition: ease all 1s;
  opacity: 0;
  ${(props) =>
    props.showContent &&
    css`
      display: block;
      opacity: 1;
    `}

  ${(props) =>
    props.mobileOpenerContent &&
    css`
      & h3 {
        display: none;
      }
      & p {
        font-size: 1rem;
        font-weight: normal;
      }
      @media (min-width: 751px) {
        display: none;
      }
    `}
`;

// Form component
export const FormComponent = styled.form`
  max-width: 500px;
  margin: 2rem auto;
  overflow: hidden;
  padding: 0 2rem;

  @media (max-width: 500px) {
    padding: 0 1rem;
  }

  input {
    margin: 1.2rem 0;
  }

  .form-text {
    display: block;
    margin-top: 0.3rem;
    color: #888;
  }

  input[type="text"],
  input[type="email"],
  input[type="password"],
  input[type="date"],
  select,
  textarea {
    display: block;
    width: 92%;
    padding: 0.4rem;
    font-size: 1.2rem;
    border: 1px solid #ccc;
    margin-left: auto;
    margin-right: auto;
    /* The above is subject to change */

    ${(props) =>
      props.registerLoginForm &&
      css`
        border-top: none;
        border-left: none;
        border-right: none;
        border-bottom: 1px solid #d6d9de;
        font-weight: 300;
        outline: none;
        color: #555;

        &:focus {
          border-bottom: 2px solid #3639a4;

          &:invalid {
            border-bottom-color: red;
          }

          &:valid {
            border-bottom-color: green;
          }
        }
      `}
  }

  input[type="submit"],
  button {
    font: inherit;
  }

  .form-group {
    margin: 1.2rem 0;
    ${(props) =>
      props.registerLoginForm &&
      css`
        &:first-child {
          input {
            margin-top: 0;
          }
        }
      `}
    .password-div {
      position: relative;

      svg {
        position: absolute;
        bottom: 7px;
        right: 50px;
        font-size: 20px;
        cursor: pointer;
      }
    }
  }

  .form-group input {
    margin: 0.2rem 0;
    ${(props) =>
      props.registerLoginForm &&
      css`
        margin-top: 2.3rem;
      `}
  }

  .submit-btn {
    margin: 0 auto;
    margin-top: 3.5rem;
    border-radius: 50px;
    padding: 0.8rem 5rem;
    background: #f86150;
    display: block;
    margin-bottom: 5rem;
    text-align: center;
    cursor: pointer;
    border: none;
    font-size: 1.2rem !important;
    color: white;
    transition: ease 0.3s all;

    &:hover {
      transform: scale(1.03);
    }
  }
`;

// All stuff(eg, all suppliers, all customers)
export const AllStuff = styled.div`
  box-shadow: 0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1);
  border-radius: 5px;
  margin: 3rem;
  border: 1px solid #ccc;
  padding: 1.5rem;
  .all-stuff-headers {
    text-align: center;
    margin: 0 auto;
  }

  @media screen and (max-width: 500px) {
    margin: 0 0 3rem 0;
  }

  .info-table {
    width: 100%;
    display: flex;
    justify-content: center;

    table{
      width: 80%;
      margin: 1em;
    }
  }

  .all-stuff-content:not(:last-child) {
    margin-bottom: 2rem;
    border-bottom: 1px solid #ccc;
  }

  .all-stuff-content-bold {
    margin-right: 0.6rem;
  }

  /* .no-recent {
    text-align: center;
  } */
`;

// Modals
export const Modal = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  z-index: 1000;
  height: 100%;
  width: 100%;
  /* opacity: .1; */
  /* background: radial-gradient(black, transparent); */
  background: #000000a1;
  font-size: 1.2rem;
  overflow-x: hidden;
  overflow-y: auto;

  .modalHeader {
    text-align: center;
  }

  form {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 0.5em;
  }

  & .modalFlex {
    display: flex;
    justify-content: center;
    width: 100%;
    align-items: center;
    margin-top: 10%;
    padding-bottom: 2rem;
  }

  & .modalContent {
    background: white;
    color: #333;
    max-width: 500px;
    border-radius: 5px;
    padding: 0 3rem 2rem 2.3rem;
    width: 100%;
    position: relative;

    @media (max-width: 650px) {
      max-width: 300px;
      padding: 0 2rem 1rem 2rem;
    }

    @media screen and (max-width: 370px) {
      & div:not(:last-of-type) {
        margin-bottom: 0.6rem;
      }
    }
  }

  & .modalContent .modalFlexInput {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    gap: 10px;

    @media (max-width: 780px) {
      flex-direction: column;
    }

    .secondChildModal {
      // flex: 0 1 60%;
      padding: 0.5rem 1rem;
      border-radius: 4px;
      border: 1px solid #a5a5a5;
      font-family: inherit;
      width: 100%;
    }

    textarea {
      resize: none;
      max-width: 100%;
      min-height: 7rem;
      max-height: 16rem;
    }

    & label:first-of-type {
      margin-right: 0.4rem;

      @media screen and (max-width: 370px) {
        margin-bottom: 0.5rem;
      }
    }

    @media screen and (max-width: 370px) {
      flex-direction: column;
      align-items: flex-start;
    }
  }
`;

// Buttons
export const Button = styled.button`
  border-radius: 6px;
  padding: 0.5rem 3rem;
  font-family: inherit;
  font-size: 1.1rem;

  /* background: red; */
  cursor: pointer;
  color: white;
  border: none;
  text-align: center;
  display: block;
  margin-left: auto;
  margin-right: auto;

  ${(props) =>
    props.submitButton &&
    css`
      background: #0069d9;
      margin: 1rem auto;
      padding: 0.5rem 1.4rem;
      transition: all 0.5s ease;

      &:hover {
        opacity: 0.9;
        transform: scale(1.01);
      }
    `}

  ${(props) =>
    props.closeButton &&
    css`
      background: #dc3545;
      margin: 1.3rem 0 0 auto;
      padding: 0.5rem 1rem;
      transition: all 0.5s ease;

      &:hover {
        opacity: 0.9;
        transform: scale(1.01);
      }
    `}
`;
