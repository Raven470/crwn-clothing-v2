import { useContext } from "react";
import "./checkout-item.styles.scss";
import { CartContext } from "../../contexts/cart.context";

function CheckoutItem({ cartItem }) {
  const { name, quantity, price, imageUrl } = cartItem;

  const { addItemToCart, removeItemToCart, clearItemFromCart } =
    useContext(CartContext);

  const removeItemHandler = () => removeItemToCart(cartItem);
  const addItemHandler = () => addItemToCart(cartItem);
  const clearItemHandler = () => clearItemFromCart(cartItem);

  return (
    <div className="checkout-item-container">
      <div className="image-container">
        <img src={imageUrl} alt={name} />
      </div>
      <p className="name">{name}</p>
      <p className="quantity">
        <span className="arrow" onClick={removeItemHandler}>
          &#10094;
        </span>
        <span className="value">{quantity}</span>
        <span className="arrow" onClick={addItemHandler}>
          &#10095;
        </span>
      </p>
      <p className="price">{price}</p>
      <p className="remove-button" onClick={clearItemHandler}>
        &#10005;
      </p>
    </div>
  );
}

export default CheckoutItem;
