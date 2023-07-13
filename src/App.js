import { useState } from "react";
import Header from "./Components/Layout/Header";
import Meals from "./Components/Meals/Meals";
import Cart from "./Components/Cart/Cart";
import CartProvider from "./store/CartProvider";

function App() {
  const [cartState, setcartState] = useState(false);
  const onCartClick = () => {
    setcartState(true);
  }

  const onCloseClick = () => {
    setcartState(false);
  }
  return (
    <CartProvider>
      {cartState && <Cart closeCart={onCloseClick}/>}
      <Header onOpenCart={onCartClick}/>
      <main>
        <Meals/>
      </main>
    </CartProvider>
  );
}

export default App;
