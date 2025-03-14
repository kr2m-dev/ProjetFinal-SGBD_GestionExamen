import React, { useState, useEffect } from 'react';
import axios from 'axios';

function ListeDevoirs({ setView }) {
  const [examens, setExamens] = useState([]); // Tableau pour stocker les examens
  const [loading, setLoading] = useState(true); // Pour savoir si les données sont en cours de chargement

  useEffect(() => {
    // Récupérer les examens de la base de données
    const fetchExamens = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/examens');
        setExamens(response.data); // Mettre à jour l'état avec les examens
        setLoading(false); // Arrêter le chargement
      } catch (error) {
        console.error("Erreur lors de la récupération des examens", error);
        setLoading(false); // Arrêter le chargement en cas d'erreur
      }
    };

    fetchExamens();
  }, []);

  // Fonction pour publier un examen
  const publierExamen = async (id) => {
    try {
      await axios.put(`http://localhost:5000/api/examens/${id}`, { publie: true });
      setExamens((prevExamens) =>
        prevExamens.map((examen) =>
          examen.id === id ? { ...examen, publie: true } : examen
        )
      );
    } catch (error) {
      console.error("Erreur lors de la publication de l'examen", error);
    }
  };

  // Fonction pour consulter la correction proposée par l'IA
  const consulterCorrection = async (id) => {
    try {
      const response = await axios.get(`http://localhost:5000/api/correction/${id}`);
      alert(`Correction proposée : ${response.data.correction}`);
    } catch (error) {
      console.error("Erreur lors de la récupération de la correction", error);
    }
  };

  return (
    <div className="liste-devoirs">
      <h2>Liste des Devoirs</h2>

      {loading ? (
        <p>Chargement des examens...</p>
      ) : (
        <ul>
          {examens.map((devoir) => (
            <li key={devoir.id}>
              <strong>{devoir.matiere}</strong> - Durée : {devoir.duree} min
              <p>Déposé le : {devoir.dateDepot} - Limite : {devoir.dateLimite}</p>

              {devoir.publie ? (
                <span style={{ color: 'green' }}>Publié</span>
              ) : (
                <button onClick={() => publierExamen(devoir.id)}>Publier</button>
              )}

              <button onClick={() => consulterCorrection(devoir.id)}>
                Consulter la correction IA
              </button>

              <button onClick={() => setView('consulter')}>Consulter les Copies</button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default ListeDevoirs;
