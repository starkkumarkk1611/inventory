import styled from "styled-components";

const DashboardComponent = styled.div`
  padding-top: 4em;
  // z-index: -3;

  .dashboard-container {
    display: grid;
    grid-template-columns: 1fr 3fr;
    min-height: 100vh;

    @media screen and (max-width: 750px) {
      display: flex;
      flex-direction: column;
    }
    .left {
      background: #fff;
      color: #000;
      border-right: 1px solid #000;
      // padding-top: 1rem;

      .left-fixed {
        // position: fixed;
        width: 100%;
        /* the above is subject to change depending on the width of the actual content which is a grid item */

        @media screen and (max-width: 750px) {
          width: 100%;

          .left-items {
            display: flex;
            justify-content: space-around;
            align-items: center;
          }
        }

        a {
          color: white;
          text-decoration: none;
        }

        .customers,
        .products,
        .sales,
        .purchases,
        .suppliers {
          // margin-bottom: 3rem;
          padding: 1rem;
          background: #fff;
          color: #000;
          border-bottom: 1px solid #000;
          transition: all 0.3s;
          text-decoration: none;
          cursor: pointer;
          font-weight: bold;

          &:hover {
            background: #323237;
            color: #fff;
          }
          // @media screen and (max-width: 750px) {
          //   margin-bottom: 0.7rem;
          //   padding: 0.5rem;
          //   text-align: center;
          //   background: none;
          // }
        }
      }

      @media screen and (max-width: 750px) {
        padding: 0;
      }
    }

    .right {
      .add {
        display: flex;
        justify-content: space-evenly;
        border-bottom: 1px solid #ccc;
        font-weight: bold;

        p {
          cursor: pointer;
        }
      }

      @media screen and (max-width: 750px) {
        margin-top: 3rem;
      }
    }

    .dashboard-header {
      text-align: center;
      margin: 1rem auto 2rem auto;
    }

    .recent {
      box-shadow: 0 4px 7px rgba(0, 0, 0, 0.3), 0 6px 1px -5px #eee;
      border-radius: 5px;
      margin: 3rem;
      padding: 1.5rem;
      .recent-headers {
        text-align: center;
        margin: 0 auto;
      }

      .your-recent-content:not(:last-child) {
        margin-bottom: 2rem;
        border-bottom: 1px solid #ccc;
      }

      .recent-content-bold {
        margin-right: 0.6rem;
      }

      .no-recent {
        text-align: center;
      }
    }
  }
`;

export default DashboardComponent;
