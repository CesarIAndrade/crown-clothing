import { createContext, useState, useEffect } from "react";

const _addItemToCart = (productToAdd, cartItems) => {
  let foundProduct = cartItems.find(
    (cartItem) => cartItem.id === productToAdd.id
  );

  if (foundProduct) {
    return cartItems.map((cartItem) =>
      cartItem.id === productToAdd.id
        ? { ...cartItem, quantity: cartItem.quantity + 1 }
        : cartItem
    );
  }

  return [...cartItems, { ...productToAdd, quantity: 1 }];
};

const _dicreaseItemInCart = (cartItem, cartItems) => {
  let foundProduct = cartItems.find((_cartItem) => _cartItem.id === cartItem.id);

  if (foundProduct.quantity === 1) {
    return cartItems.filter((_cartItem) => _cartItem.id !== cartItem.id);
  }

  return cartItems.map((_cartItem) =>
    _cartItem.id === cartItem.id
      ? { ..._cartItem, quantity: _cartItem.quantity - 1 }
      : _cartItem
  );
};

const _removeItemFromCart = (productToRemove, cartItems) => {
  return cartItems.filter((_cartItem) => _cartItem.id !== productToRemove.id);
};

export const CartContext = createContext({
  isOpen: false,
  setIsOpen: () => {},
  cartItems: [],
  addItemToCart: () => {},
  dicreaseItemInCart: () => {},
  removeItemFromCart: () => {},
  cartTotal: 0,
  cartCount: 0
});

export const CartProvider = ({ children }) => {
  let [isOpen, setIsOpen] = useState(false);
  let [cartItems, setCartItems] = useState([]);
  let [cartTotal, setCartTotal] = useState(0);
  let [cartCount, setCartCount] = useState(0);

  const addItemToCart = (productToAdd) => {
    setCartItems(_addItemToCart(productToAdd, cartItems));
  };

  const dicreaseItemInCart = (cartItem) => {
    setCartItems(_dicreaseItemInCart(cartItem, cartItems));
  };

  const removeItemFromCart = (productToRemove) => {
    setCartItems(_removeItemFromCart(productToRemove, cartItems));
  };

  useEffect(() => {
    let _cartTotal = cartItems.reduce(
      (total, cartItem) => total + cartItem.price * cartItem.quantity, 0
    );
    setCartTotal(_cartTotal);
  }, [cartItems]);

  useEffect(() => {
    let _cartCount = cartItems.reduce(
      (total, cartItem) => total + cartItem.quantity, 0
    );
    setCartCount(_cartCount);
  }, [cartItems]);

  let value = {
    isOpen,
    setIsOpen,
    cartItems,
    addItemToCart,
    dicreaseItemInCart,
    removeItemFromCart,
    cartTotal,
    cartCount
  };

  return (
    <CartContext.Provider value={value}> {children} </CartContext.Provider>
  );
};
