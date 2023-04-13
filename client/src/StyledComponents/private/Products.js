import styled from "styled-components";

const ProductsComponent = styled.div`
  padding: 3.8rem 2rem 0 2rem;
  max-width: 1100px;
  width: 100%;
  margin: auto;

  .products-header {
    text-align: center;
  }

  .search-bar {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    gap: 10px;

    @media (max-width: 780px) {
      flex-direction: column;
    }

    .search-input {
      padding: 1rem 1rem;
      border-radius: 4px;
      border: 1px solid #a5a5a5;
      font-family: inherit;
      width: 80%;
    }
`;

export default ProductsComponent;
