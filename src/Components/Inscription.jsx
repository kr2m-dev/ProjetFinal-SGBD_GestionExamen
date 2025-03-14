import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

export default function Inscription() {
  const location = useLocation();
  const { who } = location.state || {}; // Récupère le type d'utilisateur
  const navigate = useNavigate();

  // États pour gérer les champs du formulaire
  const [prenom, setPrenom] = useState("");
  const [nom, setNom] = useState("");
  const [email, setEmail] = useState("");
  const [motDePasse, setMotDePasse] = useState("");
  const [message, setMessage] = useState(null);
  const [loading, setLoading] = useState(false);

  // Fonction pour gérer l'inscription
  const handleSubmit = async (e) => {
    e.preventDefault(); // Empêche le rechargement de la page
    setLoading(true);
    setMessage(null);

    //console.log(prenom + nom + email + motDePasse + who);// c'est pour verifier les identifiants

    try {
      const response = await fetch("http://localhost:5000/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          who,
          prenom,
          nom,
          email,
          motDePasse,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setMessage({ type: "success", text: "Inscription réussie ! Vous pouvez vous connecter." });
        setTimeout(() => navigate("/"), 2000); // Redirection après succès
      } else {
        setMessage({ type: "error", text: data.error || "Erreur lors de l'inscription." });
      }
    } catch (error) {
      setMessage({ type: "error", text: "Erreur réseau, veuillez réessayer." });
    }

    setLoading(false);
  };

  return (
    <div style={styles.container}>
      <h2>Inscription {who === "etudiant" ? "Étudiant" : "Enseignant"}</h2>
      {message && (
        <div style={message.type === "success" ? styles.successMessage : styles.errorMessage}>
          {message.text}
        </div>
      )}
      <form onSubmit={handleSubmit} style={styles.form}>
        <div>
          <label>Prénom :</label>
          <input
            type="text"
            value={prenom}
            onChange={(e) => setPrenom(e.target.value)}
            required
            style={styles.input}
          />
        </div>
        <div>
          <label>Nom :</label>
          <input
            type="text"
            value={nom}
            onChange={(e) => setNom(e.target.value)}
            required
            style={styles.input}
          />
        </div>
        <div>
          <label>Email :</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            style={styles.input}
          />
        </div>
        <div>
          <label>Mot de passe :</label>
          <input
            type="password"
            value={motDePasse}
            onChange={(e) => setMotDePasse(e.target.value)}
            required
            style={styles.input}
          />
        </div>
        <button type="submit" style={styles.button} disabled={loading}>
          {loading ? "Inscription..." : "S'inscrire"}
        </button>
      </form>
      <p>
        Vous avez déjà un compte ?{" "}
        <button onClick={() => navigate("/Connexion")} style={styles.toggleButton}>
          Se connecter
        </button>
      </p>
    </div>
  );
}

// Styles
const styles = {
  container: {
    maxWidth: "400px",
    margin: "0 auto",
    padding: "20px",
    border: "1px solid #ccc",
    borderRadius: "8px",
    boxShadow: "0 2px 10px rgba(0, 0, 0, 0.1)",
  },
  form: {
    display: "flex",
    flexDirection: "column",
  },
  input: {
    padding: "10px",
    fontSize: "16px",
    borderRadius: "4px",
    border: "1px solid #ccc",
    width: "100%",
    marginBottom: "10px",
  },
  button: {
    padding: "10px",
    fontSize: "16px",
    backgroundColor: "#007bff",
    color: "#fff",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
  },
  toggleButton: {
    background: "none",
    border: "none",
    color: "#007bff",
    cursor: "pointer",
    textDecoration: "underline",
  },
  successMessage: {
    color: "green",
    marginBottom: "10px",
    fontWeight: "bold",
  },
  errorMessage: {
    color: "red",
    marginBottom: "10px",
    fontWeight: "bold",
  },
};

