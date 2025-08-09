import styles from "./Money.module.css";
function Money({ state }) {
  const { transactions } = state;
  const income = transactions.reduce(
    (acc, tran) => (tran.amount > 0 ? acc + tran.amount : acc),
    0
  );
  const expense = transactions.reduce(
    (acc, tran) => (tran.amount < 0 ? acc + tran.amount : acc),
    0
  );
  const balance = income + expense;
  console.log(balance);
  return (
    <div className={styles.money}>
      <div>
        <p>TOTAL INCOME</p>
        <span>{`$${income}.00`}</span>
      </div>
      <div>
        <p>TOTAL EXPENSE</p>
        <span>{`$${expense}.00`}</span>
      </div>
      <div>
        <p>TOTAL BALANCE</p>
        <span
          className={balance > 0 ? styles.bule : styles.red}
        >{`$${balance}.00`}</span>
      </div>
    </div>
  );
}

export default Money;
