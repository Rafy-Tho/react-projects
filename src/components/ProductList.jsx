const products = [
  { id: 1, name: "📱 Smartphone", price: 699, amount: 0 },
  { id: 2, name: "💻 Laptop", price: 1299, amount: 0 },
  { id: 3, name: "🎧 Headphones", price: 199, amount: 0 },
  { id: 4, name: "⌚ Smartwatch", price: 399, amount: 0 },
  { id: 5, name: "📷 Camera", price: 899, amount: 0 },
  { id: 6, name: "🖱️ Wireless Mouse", price: 79, amount: 0 },
];

function ProductList({ dispatch }) {
  return (
    <div className="products">
      {products.map((product) => (
        <Product product={product} key={product.id} dispatch={dispatch} />
      ))}
    </div>
  );
}

export default ProductList;

function Product({ product, dispatch }) {
  function handleAdd() {
    dispatch({ type: "add", payload: product });
    dispatch({ type: "increase", payload: product.id });
  }
  return (
    <div className="product">
      <h4>{product.name}</h4>
      <p>${product.price}</p>
      <button onClick={handleAdd}>Add to Cart</button>
    </div>
  );
}
