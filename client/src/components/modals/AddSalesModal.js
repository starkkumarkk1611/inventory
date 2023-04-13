import React, { useEffect, useRef, useState } from "react";
import { Button, Modal } from "../../StyledComponents/utility";
import { connect } from "react-redux";
import { toggleSalesModal } from "../../actions/modalAction";
import { addSale } from "../../actions/salesAction";
import callAxios from "../../utils/callAxios";
import { MdCancel } from "react-icons/md";
import { TiCancel } from "react-icons/ti";

const AddSalesModal = (props) => {
  const { showSalesModal, toggleSalesModal, addSale } = props;

  const modalContent = useRef(null);

  const [sale, setSale] = useState({
    products: [],
    issuedTo: "",
  });
  const { products, issuedTo } = sale;

  const handleChange = (e) => {
    setSale({ ...sale, [e.target.name]: e.target.value });
  };

  const handleQuantity = (qty, itemName) => {
    let updatedProducts = [];

    products.forEach(({ name, quantity, amountAvailable }) => {
      if (itemName === name)
        updatedProducts.push({ name: name, quantity: qty, amountAvailable });
      else
        updatedProducts.push({
          name: name,
          quantity: quantity,
          amountAvailable,
        });
    });
    setSale({ issuedTo, products: updatedProducts });
    // setSale(pre => {
    //   const temp = pre.products;
    //   for (var i in temp) {
    //     if (temp[i].name === name)
    //       temp[i].quantity = qty
    //   }
    //   return temp;
    // })
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (products.length !== 0) {
      addSale({
        products,
        issuedTo,
      });
      toggleSalesModal();
    }
  };
  const [allProducts, setAllProducts] = useState([]);
  const [totalProducts, setTotalProducts] = useState([]);

  useEffect(() => {
    const getAllProducts = async () => {
      const res = await callAxios("GET", "/products");
      setAllProducts(res.data.products);
      setTotalProducts(res.data.products);
    };
    getAllProducts();
  }, []);

  const [search, setSearch] = useState("");
  const searchItemsRef = useRef(null);
  const handleSelectItems = (name, amountAvailable) => {
    setSale((pre) => {
      let updateProducts = [
        ...pre.products,
        { name, quantity: 0, amountAvailable },
      ];
      return { ...pre, products: updateProducts };
    });

    setAllProducts((pre) => {
      let temp = pre.filter((item) => item.name !== name);
      return temp;
    });
  };
  const handleRemoveItems = (name) => {
    setSale((pre) => {
      let updateProducts = [
        ...pre.products.filter((item) => item.name !== name),
      ];
      return { ...pre, products: updateProducts };
    });
    setAllProducts((pre) => {
      return [...pre, ...totalProducts.filter((item) => item.name === name)];
    });
  };

  useEffect(() => {
    console.log(allProducts, sale);
  }, [allProducts, sale]);

  useEffect(() => {
    const handleDropSearch = (e) => {
      try {
        if (e.target !== document.getElementById("search"))
          searchItemsRef.current.style.display = "none";
      } catch (error) {}
    };
    window.addEventListener("click", handleDropSearch);

    return () => {
      window.removeEventListener("click", handleDropSearch);
    };
  }, []);

  return (
    <Modal>
      <div className="modalFlex">
        <div ref={modalContent} className="modalContent">
          <h2 className="modalHeader">Issue Items</h2>
          <form onSubmit={handleSubmit}>
            <div style={{ width: "100%" }}>
              <div className="modalFlexInput">
                <p>Find Product: </p>
                <input
                  className="secondChildModal"
                  name="search"
                  id="search"
                  placeholder="Search Product"
                  value={search}
                  onChange={(e) => {
                    setSearch(e.target.value);
                  }}
                  onFocus={() => {
                    searchItemsRef.current.style.display = "flex";
                  }}
                />
              </div>
              <div
                ref={searchItemsRef}
                id="search-items"
                style={{
                  display: "flex",
                  flexDirection: "column",
                  backgroundColor: "#454343",
                  color: "white",
                  width: "100%",
                  borderRadius: "5px",
                  overflowX: "hidden",
                  overflowY: "scroll",
                  maxHeight: "12em",
                  marginTop: "0.2em",
                }}
              >
                {allProducts
                  .filter((item) => {
                    return item.name
                      .toLowerCase()
                      .includes(search.toLowerCase());
                  })
                  .map((item, index) => (
                    <div
                      className="issue-item-search"
                      onClick={() => {
                        handleSelectItems(item.name, item.amountAvailable);
                      }}
                      key={`item-${index}`}
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        cursor: "pointer",
                        pointerEvents:
                          item.amountAvailable === 0 ? "none" : "default",
                        color: item.amountAvailable === 0 ? "#666" : "white",
                      }}
                    >
                      <div>{item.name.slice(0, 30)}</div>
                      {item.amountAvailable !== 0 ? (
                        <div>
                          {item.amountAvailable}
                          {" "}
                          {item.amountAvailable === 1 ? "item" : "items"}
                        </div>
                      ) : (
                        <div>Not Available</div>
                      )}
                    </div>
                  ))}
              </div>
            </div>
            <div
              id="selected-items"
              style={{
                display: "flex",
                flexDirection: "column-reverse",
                width: "100%",
                alignItems: "center",
                justifyContent: "center",
                gap: "0.2em",
              }}
            >
              {products.map(({ name, quantity, amountAvailable }, index) => (
                <div
                  style={{
                    display: "flex",
                    width: "100%",
                    alignItems: "center",
                    justifyContent: "center",
                    flexDirection: "column",
                    width: "100%",
                    backgroundColor: "#454343",
                    color: "#fff",
                    borderRadius: "5px",
                    padding: "0.5em",
                    overflow: "hidden",
                  }}
                  key={`item-${index}`}
                >
                  <div
                    style={{
                      display: "flex",
                      width: "100%",
                      justifyContent: "space-between",
                      fontWeight: "bold",
                    }}
                  >
                    {name}
                    <MdCancel
                      onClick={() => handleRemoveItems(name)}
                      style={{ cursor: "pointer" }}
                    />
                  </div>
                  <div className="modalFlexInput">
                    <p>Quantity: </p>
                    <input
                      className="secondChildModal"
                      type="number"
                      min="1"
                      max={amountAvailable}
                      name="quantity"
                      id="quantity"
                      required
                      placeholder="Enter the number of items"
                      value={quantity}
                      onChange={(e) => handleQuantity(e.target.value, name)}
                    />
                  </div>
                </div>
              ))}
              {Number(products.length) === 0 && (
                <div style={{ color: "red" }}>No Products Selected</div>
              )}
            </div>
            <div className="modalFlexInput">
              <p>Issued to: </p>
              <input
                className="secondChildModal"
                type="text"
                name="issuedTo"
                id="issuedTo"
                required
                placeholder="Enter the Customer you sold your product to"
                value={issuedTo}
                onChange={handleChange}
              />
            </div>
            <Button
              type="submit"
              disabled={!Boolean(products.length)}
              submitButton
            >
              Add Sale
            </Button>
          </form>
          <Button
            onClick={toggleSalesModal}
            closeButton
            style={{ display: "flex", alignItems: "center" }}
          >
            Close
            <TiCancel style={{ fontSize: "1.2em" }} />
          </Button>
        </div>
      </div>
    </Modal>
  );
};

const mapStateToProps = (state) => ({
  showSalesModal: state.modal.showSalesModal,
});

const mapDispatchToProps = {
  toggleSalesModal,
  addSale,
};

export default connect(mapStateToProps, mapDispatchToProps)(AddSalesModal);
