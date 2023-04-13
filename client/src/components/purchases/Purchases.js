import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { loadUser } from "../../actions/authAction";
import { getPurchases } from "../../actions/purchasesAction";
import Spinner from "../layout/Spinner";
import Navbar from "../home/Navbar";
import { AllStuff } from "../../StyledComponents/utility";
import PurchasesComponent from "../../StyledComponents/private/Purchases";
import { JSONRowsToSheet } from "../../utils/excelHelper";

const Purchases = (props) => {
  const [search, setSearch] = useState("");

  const {
    loadUser,
    user,
    purchases,
    getPurchases,
    isAuthenticated,
    authLoading,
    products,
  } = props;
  console.log(purchases);
  useEffect(() => {
    loadUser();
    getPurchases();
  }, []);
  useEffect(() => {
    if (!isAuthenticated && !authLoading) {
      props.history.push("/");
    }
  }, [props.history, isAuthenticated, authLoading]);
  if (authLoading || purchases === null) {
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
        <PurchasesComponent>
          <h1 className="purchases-header">Purchases</h1>
          <div className="search-bar">
            <input
              className="search-input"
              name="search"
              id="search"
              placeholder="Search Products..."
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
              }}
            />
            <button onClick={() => {
              console.log(purchases);
              const rows = purchases.map(row => ({
                name: row.name,
                dateOfPurchase: row.dateBought,
                quantityPurchased: row.numberBought
              }))
              JSONRowsToSheet({ rows, fileName: "purchases_history" });
            }}
            >Download Excel Sheet</button>

          </div>
          <AllStuff>
            {purchases.length !== 0 ? (
              <table style={{ width: "100%" }}>
                <thead>
                  <tr>
                    <th>Product purchased</th>
                    <th>Amount bought</th>
                    <th>Date bought</th>
                  </tr>
                </thead>
                <tbody>
                  {purchases
                    .filter((purchase) =>
                      purchase.name.toLowerCase().includes(search)
                    )
                    .map(({ name, numberBought, dateBought }, i) => (
                      <tr key={i}>
                        <td>{name}</td>
                        <td>{numberBought}</td>
                        <td>{dateBought}</td>
                      </tr>
                    ))}
                </tbody>
              </table>
            ) : (
              <h4 className="all-stuff-headers">
                You don't have any purchases yet
              </h4>
            )}
          </AllStuff>
        </PurchasesComponent>
      </>
    );
  }
};

const mapDispatchToProps = {
  loadUser,
  getPurchases,
};

const mapStateToProps = (state) => ({
  user: state.auth.user,
  authLoading: state.auth.authLoading,
  isAuthenticated: state.auth.isAuthenticated,
  purchases: state.purchases.purchases,
});

export default connect(mapStateToProps, mapDispatchToProps)(Purchases);
