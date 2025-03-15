import React from "react";
import "../styles/Card.css"; // Style séparé

const Card = ({ title, children, fullWidth }) => (
  <div className={`card ${fullWidth ? "full-width" : ""}`}>
    <h3 className="card-title">{title}</h3>
    {children}
  </div>
);

export default Card;
