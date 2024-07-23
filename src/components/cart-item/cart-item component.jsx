import { CartItemContainer, ItemDetails } from "./cart-item.styles.jsx";

function CartItem({ cartItem }) {
  const { name, quantity, price, imageUrl } = cartItem;
  return (
    <CartItemContainer>
      <img src={imageUrl} alt={name} />
      <ItemDetails>
        <span className="Name">{name}</span>
        <span className="price">
          {quantity} x ${price}
        </span>
      </ItemDetails>
    </CartItemContainer>
  );
}

export default CartItem;
