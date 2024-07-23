import { useContext } from "react";
import { CartContext } from "../../contexts/cart.context";
import {
  CheckoutItemContainer,
  ImageContainer,
  RemoveButton,
} from "./checkout-item.styles";

function CheckoutItem({ cartItem }) {
  const { name, quantity, price, imageUrl } = cartItem;

  const { addItemToCart, removeItemToCart, clearItemFromCart } =
    useContext(CartContext);

  const removeItemHandler = () => removeItemToCart(cartItem);
  const addItemHandler = () => addItemToCart(cartItem);
  const clearItemHandler = () => clearItemFromCart(cartItem);

  return (
    <CheckoutItemContainer>
      <ImageContainer>
        <img src={imageUrl} alt={name} />
      </ImageContainer>
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
      <RemoveButton onClick={clearItemHandler}>&#10005;</RemoveButton>
    </CheckoutItemContainer>
  );
}

export default CheckoutItem;
