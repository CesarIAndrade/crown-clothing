import { useContext } from "react";

import { CartContext } from "../../contexts/cart-context.component";

import "./checkout-item.styles.scss";

const CheckoutItem = ({cartItem}) => {
  const { name, imageUrl, price, quantity } = cartItem;

  const { removeItemFromCart, addItemToCart, dicreaseItemInCart } =
    useContext(CartContext);

  const _removeItemFromCart = () => removeItemFromCart(cartItem);
  const _addItemToCart = () => addItemToCart(cartItem);
  const _dicreaseItemInCart = () => dicreaseItemInCart(cartItem);

  return (
    <div className="checkout-item-container">
      <div className="image-container">
        <img src={imageUrl} alt={`${name}`} />
      </div>
      <span className="name"> {name} </span>
      <span className="quantity">
        <div className="arrow" onClick={_dicreaseItemInCart}>
          &#10094;
        </div>
        <span className="value">{quantity}</span>
        <div className="arrow" onClick={_addItemToCart}>
          &#10095;
        </div>
      </span>
      <span className="price"> {price}</span>
      <div className="remove-button" onClick={_removeItemFromCart}>
        &#10005;
      </div>
    </div>
  );
};

export default CheckoutItem;
