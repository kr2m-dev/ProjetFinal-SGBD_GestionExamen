import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";

function CreerDevoir() {
  const locate = useLocation();
  const { user } = locate.state || {};
  const idEnseignant = user?.id;

  const [matiere, setMatiere] = useState('');
  const [type, setType] = useState('Controle continu (CC)');
  const [dateDebut, setDateDebut] = useState('');
  const [duree, setDuree] = useState('');
  const [message, setMessage] = useState("");
  const [fichier, setFichier] = useState(null);
  const [showNotification, setShowNotification] = useState(false);

  useEffect(() => {
    if (message) {
      setShowNotification(true);
      const timer = setTimeout(() => {
        setShowNotification(false);
        setTimeout(() => setMessage(""), 500); // Laisse le temps à l'animation de finir
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [message]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const dateDebutObj = new Date(dateDebut);
    const dateLimiteObj = new Date(dateDebutObj.getTime() + duree * 60000);
    const dateLimite = dateLimiteObj.toISOString().slice(0, 19).replace("T", " ");

    const formData = new FormData();
    formData.append("matiere", matiere);
    formData.append("type", type);
    formData.append("dateDebut", dateDebut);
    formData.append("dateLimite", dateLimite);
    if (fichier) formData.append("fichier", fichier);
    formData.append("idEnseignant", idEnseignant);

    try {
      const response = await fetch(`http://localhost:5000/api/examens/`, {
        method: "POST",
        body: formData,
      });

      const result = await response.json();
      if (response.ok) {
        setMessage("Devoir créé avec succès !");
        resetForm();
      } else {
        setMessage("Erreur : " + result.message);
      }
    } catch (error) {
      setMessage("Erreur de connexion au serveur");
      console.error("Erreur lors de l'envoi :", error);
    }
  };

  const resetForm = () => {
    setMatiere("");
    setType("Controle continu (CC)");
    setDateDebut("");
    setDuree("");
    setFichier(null);
  };

  const styles = {
    container: {
      maxWidth: "600px",
      margin: "20px auto",
      padding: "30px",
      borderRadius: "12px",
      boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
      backgroundColor: "#ffffff",
    },
    title: {
      textAlign: "center",
      color: "#2c3e50",
      marginBottom: "30px",
      fontSize: "24px",
    },
    formGroup: {
      marginBottom: "20px",
    },
    label: {
      display: "block",
      marginBottom: "8px",
      color: "#34495e",
      fontWeight: "500",
    },
    input: {
      width: "100%",
      padding: "10px",
      borderRadius: "6px",
      border: "1px solid #bdc3c7",
      fontSize: "16px",
      transition: "border-color 0.3s ease",
    },
    select: {
      width: "100%",
      padding: "10px",
      borderRadius: "6px",
      border: "1px solid #bdc3c7",
      fontSize: "16px",
      backgroundColor: "white",
    },
    button: {
      width: "100%",
      padding: "12px",
      backgroundColor: "#3498db",
      color: "white",
      border: "none",
      borderRadius: "6px",
      fontSize: "16px",
      cursor: "pointer",
      transition: "background-color 0.3s ease, transform 0.2s ease",
      ':hover': {
        backgroundColor: "#2980b9",
        transform: "translateY(-2px)",
      },
    },
    notification: {
      position: "fixed",
      top: showNotification ? "20px" : "-100px",
      left: "50%",
      transform: "translateX(-50%)",
      backgroundColor: "#2ecc71",
      color: "white",
      padding: "15px 30px",
      borderRadius: "8px",
      display: "flex",
      alignItems: "center",
      gap: "10px",
      boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
      transition: "top 0.5s cubic-bezier(0.4, 0, 0.2, 1)",
      zIndex: 1000,
    },
    icon: {
      fontSize: "20px",
    },
  };

  return (
    <div style={styles.container}>
      {/* Notification animée */}
      {message && (
        <div style={styles.notification}>
          <i className="fas fa-check-circle" style={styles.icon}></i>
          <span>{message}</span>
        </div>
      )}

      <h2 style={styles.title}>Créer un Devoir</h2>
      
      <form onSubmit={handleSubmit}>
        <div style={styles.formGroup}>
          <label style={styles.label}>Matière :</label>
          <input
            type="text"
            value={matiere}
            onChange={(e) => setMatiere(e.target.value)}
            required
            style={styles.input}
          />
        </div>

        <div style={styles.formGroup}>
          <label style={styles.label}>Type :</label>
          <select 
            value={type} 
            onChange={(e) => setType(e.target.value)} 
            required
            style={styles.select}
          >
            <option value="Controle continu (CC)">Contrôle continu (CC)</option>
            <option value="Devoir surveille (DS)">Devoir surveillé (DS)</option>
            <option value="Travaux diriges (TD)">Travaux dirigés (TD)</option>
            <option value="Travaux pratiques (TP)">Travaux pratiques (TP)</option>
            <option value="Projets">Projets</option>
          </select>
        </div>

        <div style={styles.formGroup}>
          <label style={styles.label}>Date de Début :</label>
          <input
            type="datetime-local"
            value={dateDebut}
            onChange={(e) => setDateDebut(e.target.value)}
            required
            style={styles.input}
          />
        </div>

        <div style={styles.formGroup}>
          <label style={styles.label}>Durée (en minutes) :</label>
          <input
            type="number"
            value={duree}
            onChange={(e) => setDuree(e.target.value)}
            required
            style={styles.input}
          />
        </div>

        <div style={styles.formGroup}>
          <label style={styles.label}>Télécharger un fichier (PDF/TXT) :</label>
          <input
            type="file"
            accept=".pdf,.txt"
            onChange={(e) => setFichier(e.target.files[0])}
            required
            style={styles.input}
          />
        </div>

        <button type="submit" style={styles.button}>
          Créer le Devoir
        </button>
      </form>
    </div>
  );
}

export default CreerDevoir;