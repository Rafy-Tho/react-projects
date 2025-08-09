function Total({ products }) {
  const total = products.reduce((acc, pro) => acc + pro.price * pro.amount, 0);

  return <div className="total"> Toal: ${total}</div>;
}

export default Total;
