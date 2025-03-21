import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

export default function User({ choix, description }) {
  const navigate = useNavigate();

  const handleClick = () => {
    console.log(choix);
    navigate("/Connexion", { state: { who: choix } });
  };

  return (
    <div style={style.container}>
      <div style={style.buttonContainer}>
        <button type="button" onClick={handleClick} style={style.button}>
          <h3 style={style.buttonText}>{choix}</h3>
        </button>
      </div>
      <div>
        <p style={style.description}>{description}</p>
      </div>
    </div>
  );
}

const style = {
  container: {
    width: "30%",
    padding: "10px",
    borderRadius: "8px",
    backgroundColor: "#f1f2f6", // Gris clair
    boxShadow: "2px 2px 10px rgba(0, 0, 0, 0.1)",
  },
  buttonContainer: {
    display: "flex",
    justifyContent: "center",
  },
  button: {
    width: "60%",
    padding: "10px",
    border: "2px solid #3742fa", // Bordure bleue
    borderRadius: "5px",
    backgroundColor: "white",
    color: "#3742fa",
    fontSize: "32px",
    cursor: "pointer",
    transition: "all 0.3s ease",
  },
  
  buttonText: {
    margin: 0, // Évite l'espacement par défaut des <h3>
  },
  description: {
    textAlign: "center",
    color: "#333",
  },
};
