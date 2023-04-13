import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { loadUser } from "../../actions/authAction";
import { getProducts } from "../../actions/productsAction";
import Spinner from "../layout/Spinner";
import Navbar from "../home/Navbar";
import { AllStuff } from "../../StyledComponents/utility";
import ProductsComponent from "../../StyledComponents/private/Products";
import { JSONRowsToSheet } from "../../utils/excelHelper";

const Products = (props) => {
  const [search, setSearch] = useState("");

  const {
    loadUser,
    getProducts,
    products,
    user,
    isAuthenticated,
    authLoading,
  } = props;

  useEffect(() => {
    loadUser();
    getProducts();
  }, []);

  useEffect(() => {
    if (!isAuthenticated && !authLoading) {
      props.history.push("/");
    }
  }, [props.history, isAuthenticated, authLoading]);



  if (authLoading || products === null) {
    return (
      <>
        <h2 style={{ textAlign: "center", margin: "3rem auto 0 auto" }}>
          Loading...
        </h2>
        <Spinner />
      </>
    );
  } else {
    return (
      <>
        <Navbar private />
        <ProductsComponent>
          <h1 className="products-header">Items Available</h1>
          <div className="search-bar">
            <input
              className="search-input"
              name="search"
              id="search"
              placeholder="Search Products or Description..."
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
              }}
            />
            <button onClick={()=>
              {
                const rows = products.map(row =>({
                  name:row.name,
                  description:row.description,
                  amountAvailable: row.amountAvailable 
                }))
                JSONRowsToSheet({rows, fileName:"available_items"})}
              }
                >Download Excel Sheet</button>

          </div>


          <AllStuff>
            {products.length !== 0 ? (
              products
                .filter(
                  (product) =>
                    product.name.toLowerCase().includes(search) ||
                    product.description.toLowerCase().includes(search)
                )
                .map((elem, index) => (
                  <div key={index} className="all-stuff-content">
                    <p>
                      <b className="all-stuff-content-bold">Name of product:</b>
                      {elem.name}
                    </p>
                    <p>
                      <b className="all-stuff-content-bold">
                        Amount available:
                      </b>
                      {elem.amountAvailable}
                    </p>
                    <p>
                      <b className="all-stuff-content-bold">Description:</b>#
                      {elem.description}
                    </p>
                  </div>
                ))
            ) : (
              <h4 className="all-stuff-headers">
                You don't have any Products yet
              </h4>
            )}
          </AllStuff>
        </ProductsComponent>
      </>
    );
  }
};

const mapDispatchToProps = {
  loadUser,
  getProducts,
};

const mapStateToProps = (state) => ({
  user: state.auth.user,
  authLoading: state.auth.authLoading,
  isAuthenticated: state.auth.isAuthenticated,
  products: state.products.products,
});

export default connect(mapStateToProps, mapDispatchToProps)(Products);
