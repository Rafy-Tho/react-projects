import { useReducer } from "react";
import styles from "./FormTransaction.module.css";
const categorys = [
  "food",
  "transportation",
  "bill",
  "entertainment",
  "shopping",
  "health",
  "otther",
];
const initialState = {
  description: "",
  amount: "",
  types: "income",
  category: "food",
};

function reducer(state, action) {
  switch (action?.type) {
    case "text":
      return { ...state, description: action.payload };
    case "amount":
      return {
        ...state,
        amount: action.payload,
      };
    case "type":
      return {
        ...state,
        types: action.payload,
        amount:
          action.payload === "income" ? Math.abs(state.amount) : -state.amount,
      };
    case "category":
      return { ...state, category: action.payload };
    case "submit":
      return initialState;
    default:
      throw Error("unknown action");
  }
}
function FormTransaction({ dispatch }) {
  const [transaction, dispatchTranseaction] = useReducer(reducer, initialState);
  const { description, amount, types, category } = transaction;
  function handleSubmit(e) {
    e.preventDefault();
    dispatch({ type: "add", payload: transaction });
    dispatchTranseaction({ type: "submit" });
  }
  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <h2>Add New Transaction</h2>

      <label>Description</label>
      <input
        value={description}
        onChange={(e) =>
          dispatchTranseaction({ type: "text", payload: e.target.value })
        }
        type="text"
        placeholder="Enter description..."
      />

      <label>Amount</label>
      <input
        value={amount}
        onChange={(e) =>
          dispatchTranseaction({
            type: "amount",
            payload: Math.abs(e.target.value),
          })
        }
        type="text"
        placeholder="0.00"
      />

      <label>Type</label>
      <select
        value={types}
        onChange={(e) =>
          dispatchTranseaction({ type: "type", payload: e.target.value })
        }
      >
        <option value="income">Income</option>
        <option value="expense">Expense</option>
      </select>

      <label>Category</label>
      <select
        value={category}
        onChange={(e) =>
          dispatchTranseaction({ type: "category", payload: e.target.value })
        }
      >
        {categorys.map((about) => (
          <option value={about} key={about}>
            {about.toUpperCase()}
          </option>
        ))}
      </select>

      <button>Add</button>
    </form>
  );
}

export default FormTransaction;
