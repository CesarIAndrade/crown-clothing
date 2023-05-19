import { useContext } from "react";

import { CartContext } from "../../contexts/cart-context.component";

import Button from "../button/button.component";

const ProductCard = ({ product }) => {
  let { name, imageUrl, price } = product;
  let { addItemToCart } = useContext(CartContext);

  const _addItemsToCart = () => addItemToCart(product);

  return (
    <div className="product-card-container">
      <img src={imageUrl} alt={name} />
      <div className="footer">
        <span className="name">{name}</span>
        <span className="price">{price}</span>
      </div>
      <Button buttonType="inverted" onClick={_addItemsToCart}>
        Add to Cart
      </Button>
    </div>
  );
};

export default ProductCard;
