import React from "react";
import { Link } from "react-router-dom";
import "../../App.css";

const Menu = () => {
  return (
    <div>
      <ul className="nav">
        <Link to="/">
          <li>Home</li>
        </Link>
        <Link to="/doces">
          <li>Comida</li>
        </Link>
        <Link to="/pedidos">
          <li>Pedidos</li>
        </Link>
      </ul>
    </div>
  );
};

export default Menu;
