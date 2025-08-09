import { useEffect, useReducer } from "react";
import CardList from "./components/CardList";
import Header from "./components/Header";
import ProductList from "./components/ProductList";

const initialState = JSON.parse(localStorage.getItem("products")) || [];
function reducer(products, action) {
  switch (action.type) {
    case "add": {
      const find = products.find((product) => product.id === action.payload.id);
      if (find) return products;
      return [...products, action.payload];
    }
    case "increase":
      return products.map((product) =>
        product.id === action.payload
          ? { ...product, amount: +product.amount + 1 }
          : product
      );
    case "decrease":
      return products.map((product) =>
        product.id === action.payload
          ? { ...product, amount: +product.amount - 1 }
          : product
      );
    case "delete":
      return products.filter((product) => product.id !== action.payload);
    case "set":
      return products.map((product) =>
        product.id === action.payload.id
          ? { ...product, amount: action.payload.set }
          : product
      );
    default:
      throw Error("unknown action");
  }
}
function App() {
  const [products, dispatch] = useReducer(reducer, initialState);
  useEffect(
    () => localStorage.setItem("products", JSON.stringify(products)),
    [products]
  );
  return (
    <div className="app">
      <Header />
      <ProductList dispatch={dispatch} />
      <CardList products={products} dispatch={dispatch} />
    </div>
  );
}

export default App;
