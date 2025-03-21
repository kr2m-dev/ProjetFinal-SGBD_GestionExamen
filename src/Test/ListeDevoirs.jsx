import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";

function ListeDevoirs({ setView }) {
  const locate = useLocation();
  const { user } = locate.state || {};
  const idEnseignant = user?.id;

  const [examens, setExamens] = useState([]);
  const [loading, setLoading] = useState(true);
  const [correction, setCorrection] = useState("");
  const [fichierCorrection, setFichierCorrection] = useState("");
  const [correctionLoading, setCorrectionLoading] = useState(false);

  useEffect(() => {
    const fetchExamens = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/examens/${idEnseignant}`);
        
        const examensWithCorrections = await Promise.all(
          response.data.map(async (examen) => {
            try {
              const correctionRes = await axios.get(`http://localhost:5000/api/correction-info/${examen.idExamen}`);
              if (correctionRes.data && correctionRes.data.nomCorrige) {
                return { ...examen, fichierCorrection: correctionRes.data.nomCorrige };
              }
            } catch (err) {
              // Si pas de correction, on ignore l'erreur
            }
            return examen;
          })
        );
        
        setExamens(examensWithCorrections);
      } catch (error) {
        console.error("Erreur lors de la récupération des examens", error);
      } finally {
        setLoading(false);
      }
    };

    fetchExamens();
  }, []);

  const publierExamen = async (idExamen) => {
    try {
      await axios.put(`http://localhost:5000/api/examens/${idExamen}`, { publie: true });

      setExamens((prevExamens) =>
        prevExamens.map((examen) =>
          examen.idExamen === idExamen ? { ...examen, publie: true } : examen
        )
      );
    } catch (error) {
      console.error("Erreur lors de la publication de l'examen", error);
    }
  };

  const consulterCorrection = async (idExamen) => {
    setCorrection("Génération de la correction en cours...");
    setCorrectionLoading(true);
    try {
      const response = await axios.get(`http://localhost:5001/api/correction/${idExamen}`);

      setCorrection(response.data.correction);
      setFichierCorrection(response.data.fichierCorrection);
      
      setExamens((prevExamens) =>
        prevExamens.map((examen) =>
          examen.idExamen === idExamen 
            ? { ...examen, fichierCorrection: response.data.fichierCorrection } 
            : examen
        )
      );
    } catch (error) {
      console.error("Erreur lors de la récupération de la correction", error);
      setCorrection("Erreur lors de la récupération de la correction.");
    } finally {
      setCorrectionLoading(false);
    }
  };

  const telechargerCorrection = async (nomFichier) => {
    try {
      window.open(`http://localhost:5000/api/telecharger-correction/${nomFichier}`, '_blank');
    } catch (error) {
      console.error("Erreur lors du téléchargement", error);
    }
  };

  return (
    <div style={styles.listeDevoirs}>
      <h2 style={styles.titre}>📘 Liste des Examens</h2>

      {loading ? (
        <p>Chargement des examens...</p>
      ) : (
        <div style={styles.examList}>
          {examens.map((devoir) => (
            <div key={devoir.idExamen} style={styles.examCard}>
              <h3 style={styles.examTitle}>{devoir.titre}</h3>
              <p style={styles.examInfo}>⏳ Durée : {devoir.duree} min</p>
              <p style={styles.examInfo}>📅 Date de début : {devoir.dateDebut}</p>
              <p style={styles.examInfo}>📌 Date limite : {devoir.dateLimite}</p>

              <div style={{ ...styles.status, backgroundColor: devoir.publie ? "#28a745" : "#dc3545" }}>
                {devoir.publie ? "✅ Publié" : "❌ Non publié"}
              </div>

              {!devoir.publie && (
                <button style={styles.button} onClick={() => publierExamen(devoir.idExamen)}>
                  📢 Publier
                </button>
              )}

              {devoir.fichierCorrection ? (
                <button style={styles.button} onClick={() => telechargerCorrection(devoir.fichierCorrection)}>
                  📥 Télécharger la correction
                </button>
              ) : (
                <button 
                  style={styles.button} 
                  onClick={() => consulterCorrection(devoir.idExamen)}
                  disabled={correctionLoading}
                >
                  {correctionLoading ? "⏳ Génération en cours..." : "🤖 Générer correction IA"}
                </button>
              )}

              <button style={styles.linkButton} onClick={() => setView("consulter")}>
                📄 Consulter les Copies
              </button>
            </div>
          ))}
        </div>
      )}

      {correction && (
        <div style={styles.correction}>
          <h3>Correction IA :</h3>
          <p>{correction}</p>
          {fichierCorrection && (
            <button style={styles.button} onClick={() => telechargerCorrection(fichierCorrection)}>
              📥 Télécharger cette correction
            </button>
          )}
        </div>
      )}
    </div>
  );
}

export default ListeDevoirs;

// Styles CSS intégrés
const styles = {
  listeDevoirs: {
    maxWidth: "1200px",
    margin: "0 auto",
    padding: "20px",
    backgroundColor: "#f8f9fa",
    borderRadius: "8px",
    boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
  },
  titre: {
    textAlign: "center",
    color: "#333",
    marginBottom: "20px",
  },
  examList: {
    display: "flex",
    flexWrap: "wrap",
    gap: "15px",
  },
  examCard: {
    backgroundColor: "#ffffff",
    border: "1px solid #ddd",
    borderRadius: "8px",
    padding: "15px",
    boxShadow: "0 1px 3px rgba(0, 0, 0, 0.1)",
    width: "calc(50% - 10px)",
  },
  examTitle: {
    color: "#333",
    fontSize: "1.2rem",
  },
  examInfo: {
    color: "#666",
  },
  status: {
    padding: "5px 10px",
    borderRadius: "5px",
    fontSize: "0.8em",
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: "10px",
  },
  button: {
    backgroundColor: "#007bff",
    color: "white",
    border: "none",
    padding: "8px 12px",
    borderRadius: "5px",
    cursor: "pointer",
    transition: "background-color 0.3s",
    margin: "5px",
  },
  linkButton: {
    backgroundColor: "transparent",
    color: "#007bff",
    textDecoration: "underline",
    cursor: "pointer",
  },
  correction: {
    marginTop: "20px",
    padding: "15px",
    border: "1px solid #ddd",
    borderRadius: "8px",
    backgroundColor: "#f9f9f9",
  },
};
