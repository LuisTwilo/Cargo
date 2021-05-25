import React from "react";
import "./NavbarItem.css";

function NavbarItem({ Icon, label }) {
  return (
    <div className="navbar-item">
      {Icon && <Icon />}
      <p className="navbar-item__label">{label}</p>
    </div>
  );
}

export default NavbarItem;
