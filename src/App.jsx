import { useReducer, useEffect, useState } from "react";
import "./App.css";

const reducer = (state, action) => {
  console.log(action);
  switch (action.type) {
    case "ADD_TO_CART":
      return [...state, action.product];
    case "REMOVE_FROM_CART":
      const newState = state.filter((product) => product.id !== action.id);
      return newState;
    default:
      return state;
  }
};

function App() {
  const [total, setTotal] = useState(0);
  const [products, setProducts] = useState([]);
  const initialState = [];

  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    try {
      fetch("https://dummyjson.com/products")
        .then((response) => response.json())
        .then((data) => setProducts(data.products));
    } catch (error) {
      console.log(error);
    }
  }, []);

  console.log(state);

  const addToCart = (product) => {
    dispatch({ type: "ADD_TO_CART", product });
  };

  const removeFromCart = (id) => {
    dispatch({ type: "REMOVE_FROM_CART", id });
  };

  useEffect(() => {
    setTotal(state.reduce((acc, b) => acc + b.price, 0).toFixed(2));
  }, [state]);

  return (
    <div style={{ display: "flex", justifyContent: "space-between" }}>
      <div>
        <h1>PRODUCTS</h1>
        {products.map((product) => (
          <div key={product.id}>
            <img width={100} src={product.images[0]} alt="" />
            <h3>{product.title}</h3>
            <p>${product.price}</p>
            <button onClick={() => addToCart(product)}>Add to cart</button>
          </div>
        ))}
      </div>

      <div>
        <h1>
          CART PRODUCTS <span>{state.length}</span>
        </h1>
        <strong>
          Subtotal: ${total}
          <br />
          Tax: ${(total * 0.12).toFixed(2)}
          <br />
          Total: ${(total * 1.12).toFixed(2)}
        </strong>
        {state.map((product) => (
          <div key={product.id}>
            <img width={100} src={product.images[0]} alt="" />
            <h3>{product.title}</h3>
            <p>${product.price}</p>
            <button onClick={() => removeFromCart(product.id)}>
              Remove from cart
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
