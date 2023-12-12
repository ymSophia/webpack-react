import React from "react";
import { Link } from "react-router-dom";
const Header = () => {
  return (
    <div className="bg-white px-10 py-4 flex gap-20 rounded-lg mb-10">
      <Link to="/profile">user</Link>
      <Link to="/file-center">File center</Link>
      <Link to="/product/2021">Product 2021</Link>
      <Link to="/product/2022">Product 2022</Link>
    </div>
  );
};

export default Header;
