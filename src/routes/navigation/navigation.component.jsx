import { useContext } from "react";
import { Link, Outlet } from "react-router-dom";

import { ReactComponent as Logo } from "../../assets/crown.svg";

import { UserContext } from "../../contexts/user-context.component";
import { CartContext } from "../../contexts/cart-context.component";

import { _signOut } from "../../utils/firebase/firebase.component";

import CartIcon from "../../components/cart-icon/cart-icon.component";
import CartDropdown from "../../components/cart-dropdown/cart-dropdown.component";

import "./navigation.styles.scss";

const Navigation = () => {
  let { currentUser } = useContext(UserContext);
  let { isOpen } = useContext(CartContext);

  return (
    <>
      <div className="navigation">
        <Link to="/" className="logo-container">
          <Logo />
        </Link>
        <div className="nav-links-container">
          <Link to="/shop" className="nav-link">
            Shop
          </Link>
          {currentUser ? (
            <span className="nav-link" onClick={_signOut}>
              Sign Out
            </span>
          ) : (
            <Link to="/auth" className="nav-link">
              Sign In
            </Link>
          )}
          <CartIcon />
        </div>
        { isOpen && <CartDropdown /> }
      </div>
      <Outlet />
    </>
  );
};

export default Navigation;
