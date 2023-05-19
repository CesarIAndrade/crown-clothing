import { useContext } from "react";

import { ReactComponent as ShoppingCartIcon } from "../../assets/shopping-bag.svg";

import { CartContext } from "../../contexts/cart-context.component";

import "./cart-icon.styles.scss";

const CartIcon = () => {
  let { isOpen, setIsOpen, cartCount } = useContext(CartContext);

  const toggleIsOpen = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="cart-icon-container">
      <ShoppingCartIcon
        className="shopping-icon"
        onClick={toggleIsOpen}
      ></ShoppingCartIcon>
      <span className="item-count">{cartCount}</span>
    </div>
  );
};

export default CartIcon;
