import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { loadUser } from "../../actions/authAction";
import { getSales } from "../../actions/salesAction";
import Spinner from "../layout/Spinner";
import Navbar from "../home/Navbar";
import { AllStuff, Button } from "../../StyledComponents/utility";
import SalesComponent from "../../StyledComponents/private/Sales";
import callAxios from "../../utils/callAxios";
import { JSONRowsToSheet } from "../../utils/excelHelper";

const Sales = (props) => {
  const [search, setSearch] = useState("");

  const { loadUser, user, getSales, sales, isAuthenticated, authLoading } =
    props;
  useEffect(() => {
    loadUser();
    getSales();
  }, []);

  useEffect(() => {
    if (!isAuthenticated && !authLoading) {
      props.history.push("/");
    }
  }, [props.history, isAuthenticated, authLoading]);

  const handleRecieve = async (id) => {
    try {
      const res = await callAxios("PUT", `sales/${id}/close`);
    } catch (error) { }
  };
  if (authLoading || sales === null) {
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
        <SalesComponent>
          <h1 className="sales-header">All Issues</h1>
          <div className="search-bar">
            <input
              className="search-input"
              name="search"
              id="search"
              placeholder="Search Name Of person Issued To..."
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
              }}
            />
            <button onClick={() => {
              console.log(sales);
              let rows = [];
              sales.forEach(({ issuedTo, products, date, isReturned, returnDate }) => {
                let row = { issuedTo, issuedDate: new Date(date).toLocaleString(), isReturned, returnDate }
                products.forEach(({ name, quantity }) => {
                  rows.push({ ...row, productName: name, quantity })
                })
              })
              console.log(rows);
              JSONRowsToSheet({ rows, fileName: "all_issues" });
            }}
            >Download Excel Sheet</button>
          </div>
          <AllStuff>
            {sales.length !== 0 ? (
              sales
                .filter((sale) => sale.issuedTo.toLowerCase().includes(search))
                .map((elem, index) => (
                  <div className="all-stuff-content" key={index}>
                    <div>
                      <p>
                        <b className="all-stuff-content-bold">Issued To:</b>
                        <span className="all-stuff-content-bold">
                          {elem.issuedTo}
                        </span>
                      </p>
                      <p>
                        <b className="all-stuff-content-bold">Return Status:</b>
                        <span className="all-stuff-content-bold">
                          {elem.isReturned ? "Recieved" : "Pending"}
                        </span>
                      </p>
                    </div>
                    <div className="info-table">
                      <table width={"100%"}>
                        <thead>
                          <tr>
                            <th>Name</th>
                            <th>Quantity</th>
                          </tr>
                        </thead>
                        <tbody>
                          {elem.products.map(({ name, quantity }, index) => (
                            <tr key={index}>
                              <td width={"50%"}>{name}</td>
                              <td width={"50%"}>{quantity}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>

                    {!elem.isReturned && (
                      <Button
                        style={{
                          backgroundColor: "#3672a4",
                          marginBottom: "1rem",
                        }}
                        onClick={() => handleRecieve(elem._id)}
                      >
                        Recieve
                      </Button>
                    )}
                  </div>
                ))
            ) : (
              <h4 className="all-stuff-headers">
                You don't have any sales yet
              </h4>
            )}
          </AllStuff>
        </SalesComponent>
      </>
    );
  }
};

const mapDispatchToProps = {
  loadUser,
  getSales,
};

const mapStateToProps = (state) => ({
  user: state.auth.user,
  authLoading: state.auth.authLoading,
  isAuthenticated: state.auth.isAuthenticated,
  sales: state.sales.sales,
});

export default connect(mapStateToProps, mapDispatchToProps)(Sales);
