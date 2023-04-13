import {
  GET_PURCHASES,
  PURCHASES_ERROR,
  ADD_PURCHASES,
  ADD_PURCHASES_ERROR,
  CLEAR_ALERT,
} from "../actions/types";

const initialState = {
  purchasesDashboard: null,
  purchases: null,
  loadingPurchases: false,
  error: null,
  purchasesAlert: [],
};

let purchasesArr = [];
let alertArr = [...initialState.purchasesAlert];

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_PURCHASES:
      purchasesArr = [];
      console.log(action.payload);
      action.payload.forEach((elem, index) => {
        // console.log("Elem", elem)
        // purchasesArr = elem.history;
        elem.history.forEach((e, i) => {
          purchasesArr.push({
            name: elem.name,
            description: e.description,
            // boughtFrom: e.boughtFrom,
            dateBought: e.dateBought,
            numberBought: e.quantity,
            // costPrice: elem.costPrice
          });
        });
      });
      console.log(purchasesArr);
      return {
        ...state,
        purchasesDashboard: action.payload.slice(0, 5).map((elem) => [
          {
            name: elem.name,
            // costPrice: elem.costPrice,
            lastHistory: elem.history[elem.history.length - 1],
          },
        ]),
        purchases: purchasesArr,
      };
    case PURCHASES_ERROR:
      return {
        ...state,
      };
    case ADD_PURCHASES:
      // console.log(action.payload)
      alertArr = [...state.purchasesAlert];
      alertArr.unshift(action.payload.alert);
      return {
        ...state,
        purchasesAlert: alertArr,
      };
    case ADD_PURCHASES_ERROR:
      // console.log(action.payload)
      alertArr = [...state.purchasesAlert];
      alertArr.unshift(action.payload.alert);
      return {
        ...state,
        purchasesAlert: alertArr,
      };
    case CLEAR_ALERT:
      alertArr = [...state.purchasesAlert];
      return {
        ...state,
        purchasesAlert: alertArr.filter((elem) => elem.id !== action.payload),
      };

    default:
      return state;
  }
};
