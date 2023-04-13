import styled from "styled-components";

const FooterComponent = styled.footer`
  background-color: #edeaeab7;
  width: 100%;
  padding-inline: 2em;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.5em;

  @media (max-width: 780px) {
    flex-direction: column;
    justify-content: center;
  }

  img {
    height: 4em;
    object-fit: contain;
  }

  .box {
    display: flex;
    alignitems: center;
    justifycontent: center;
    gap: 10px;

    a {
      color: #000;
      transition: all 0.5s ease-in-out;
      &:hover {
        color: var(--iconColor);
      }
    }
  }
`;

export default FooterComponent;
