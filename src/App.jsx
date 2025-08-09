import styles from "./App.module.css";
import { useEffect, useReducer } from "react";
import Header from "./components/Header";
import Money from "./components/Money";
import FormTransaction from "./components/FormTransaction";
import Result from "./components/Result";
const initialState = {
  transactions: [],
  show: "all",
};
function reducer(state, actoin) {
  switch (actoin.type) {
    case "add":
      return {
        ...state,
        transactions: [
          ...state.transactions,
          { id: Date.now(), ...actoin.payload },
        ],
      };

    case "delete":
      return {
        ...state,
        transactions: state.transactions.filter(
          (transaction) => transaction.id !== actoin.payload
        ),
      };
    case "all":
      return { ...state, show: "all" };
    case "income":
      return { ...state, show: "income" };
    case "expense":
      return { ...state, show: "expense" };
    default:
      throw Error("unknow action");
  }
}
const getLocal = JSON.parse(localStorage.getItem("state")) || initialState;
function App() {
  const [state, dispatch] = useReducer(reducer, getLocal);
  useEffect(
    () => localStorage.setItem("state", JSON.stringify(state)),
    [state]
  );
  return (
    <div className={styles.app}>
      <Header />
      <Money state={state} />
      <FormTransaction dispatch={dispatch} />
      <Result state={state} dispatch={dispatch} />
    </div>
  );
}

export default App;
