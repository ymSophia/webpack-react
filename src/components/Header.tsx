import React from "react";
import { Link } from "react-router-dom";
const Header = () => {
  return (
    <div>
      <Link to="/profile">user</Link>
      <Link to="/product/2021">Product 2021</Link>
      <Link to="/product/2022">Product 2022</Link>
    </div>
  );
};

export default Header;
