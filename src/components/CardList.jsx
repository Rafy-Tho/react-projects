import Total from "./Total";

function CardList({ products, dispatch }) {
  const hasPro = products.length !== 0;

  return (
    <div className="con">
      <CountItem products={products} />
      {!hasPro && <Show />}
      {hasPro && (
        <>
          <Carts products={products} dispatch={dispatch} />
          <Total products={products} />
        </>
      )}
    </div>
  );
}

export default CardList;

function CountItem({ products }) {
  return <h2>Your Cart ({products.length} items)</h2>;
}
function Carts({ products, dispatch }) {
  return (
    <ul className="carts">
      {products.map((product) => (
        <Cart product={product} key={product.name} dispatch={dispatch} />
      ))}
    </ul>
  );
}

function Cart({ product, dispatch }) {
  const { id, name, price, amount = 0 } = product;
  return (
    <li className="cart">
      <div className="name">
        <p>
          <strong>{name}</strong>
        </p>
        <p>${price} each</p>
      </div>
      <div className="counter">
        <button onClick={() => dispatch({ type: "decrease", payload: id })}>
          -
        </button>
        <input
          value={amount}
          type="number"
          onChange={(e) =>
            dispatch({ type: "set", payload: { id, set: +e.target.value } })
          }
        />
        <button onClick={() => dispatch({ type: "increase", payload: id })}>
          +
        </button>
      </div>
      <div className="remove">
        <strong>${price * amount}</strong>
        <button onClick={() => dispatch({ type: "delete", payload: id })}>
          Remve
        </button>
      </div>
    </li>
  );
}

function Show() {
  return <p className="empty">Your cart is empty</p>;
}
