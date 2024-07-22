import { useContext } from "react";
import { CartContext } from "../../contexts/cart.context";
import { useNavigate } from "react-router-dom";
import Button from "../button/button.component";
import CartItem from "../cart-item/cart-item component";

import "./cart-dropdown.styles.scss";

function CartDropdown() {
  const { cartItems, setIsCartOpen } = useContext(CartContext);
  const navigate = useNavigate();

  function handleCheckout() {
    setIsCartOpen(false);
    navigate("/checkout");
  }

  return (
    <div className="cart-dropdown-container">
      <div className="cart-items"></div>
      {cartItems.map((item) => (
        <CartItem key={item.id} cartItem={item} />
      ))}
      <Button onClick={handleCheckout}>go to checkout</Button>
    </div>
  );
}

export default CartDropdown;
