import styles from "./Result.module.css";

function Result({ state, dispatch }) {
  return (
    <div className={styles.result}>
      <h2>Recent Transations</h2>
      <Button state={state} dispatch={dispatch} />
      <TransationsList state={state} dispatch={dispatch} />
    </div>
  );
}

export default Result;

function Button({ state, dispatch }) {
  const { show } = state;
  return (
    <div className={styles.btns}>
      <button
        className={show === "all" ? "active" : ""}
        onClick={() => dispatch({ type: "all" })}
      >
        All
      </button>
      <button
        className={show === "income" ? "active" : ""}
        onClick={() => dispatch({ type: "income" })}
      >
        Income
      </button>
      <button
        className={show === "expense" ? "active" : ""}
        onClick={() => dispatch({ type: "expense" })}
      >
        Expense
      </button>
    </div>
  );
}

function TransationsList({ state, dispatch }) {
  const { transactions, show } = state;
  const income = transactions.filter(
    (transaction) => transaction.types === "income"
  );
  const expense = transactions.filter(
    (transaction) => transaction.types === "expense"
  );
  const trans = {
    all: transactions,
    income,
    expense,
  };
  return (
    <ul>
      {trans[show].map((transaction) => (
        <TransactionItem
          transaction={transaction}
          key={transaction.id}
          dispatch={dispatch}
        />
      ))}
    </ul>
  );
}

function TransactionItem({ transaction, dispatch }) {
  const date = new Date(transaction.id);

  return (
    <li className={`${styles.list} ${styles[transaction.types]}`}>
      <div>
        <p>
          <strong>{transaction.description}</strong>
        </p>
        <div>
          <p> {transaction.category}</p>
          <span>Date </span>
          {date.toLocaleDateString()}
        </div>
      </div>
      <div style={{ display: "flex" }}>
        <span>{transaction.types}</span>
        <button
          onClick={() => dispatch({ type: "delete", payload: transaction.id })}
        >
          X
        </button>
      </div>
    </li>
  );
}
