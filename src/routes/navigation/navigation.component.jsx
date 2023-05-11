import { Link, Outlet } from "react-router-dom";

import "./navigation.styles.scss";
import { ReactComponent as Logo } from "../../assets/crown.svg";

const Navigation = () => {
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
        </div>
      </div>
      <Outlet />
    </>
  );
};

export default Navigation;
