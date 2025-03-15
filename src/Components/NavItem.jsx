import React from "react";
import "../styles/NavItem.css"; // Style séparé

const NavItem = ({ icon, text, onClick }) => (
  <div className="nav-item" onClick={onClick}>
    <span className="icon">{icon}</span>
    <span>{text}</span>
  </div>
);

export default NavItem;
