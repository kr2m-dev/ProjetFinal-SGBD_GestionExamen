import React, { useState, useEffect } from "react";

function Accueil() {
  const [prenom, setPrenom] = useState("Étudiant");
  const [annonces, setAnnonces] = useState([
    "Les examens de fin de semestre commencent le 15 juin.",
    "N'oubliez pas de soumettre vos réponses avant la date limite !",
    "Les résultats des examens seront publiés le 25 juin."
  ]);

  useEffect(() => {
    // Simulation d'un prénom récupéré (à remplacer par une vraie donnée du backend plus tard)
    const storedPrenom = "Jean"; // Exemple
    setPrenom(storedPrenom);
  }, []);

  return (
    <div className="bg-white shadow-md rounded-lg p-6">
      <h2 className="text-2xl font-bold text-gray-800">Bienvenue, {prenom} ! 👋</h2>
      <p className="text-gray-600 mt-2">Voici les dernières annonces :</p>
      <ul className="mt-4 space-y-2">
        {annonces.map((annonce, index) => (
          <li key={index} className="bg-gray-100 p-3 rounded-md text-gray-700">
            {annonce}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Accueil;
