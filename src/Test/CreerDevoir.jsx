import React, { useState } from 'react';

function CreerDevoir() {
  const [matiere, setMatiere] = useState('');
  const [duree, setDuree] = useState('');
  const [dateDepot, setDateDepot] = useState('');
  const [dateLimite, setDateLimite] = useState('');
  const [fichier, setFichier] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Logique pour soumettre le devoir
    console.log({ matiere, duree, dateDepot, dateLimite, fichier });
  };

  return (
    <div className="creer-devoir-form">
      <h2>Créer un Devoir</h2>
      <form onSubmit={handleSubmit}>
        <label>Matière :</label>
        <input
          type="text"
          value={matiere}
          onChange={(e) => setMatiere(e.target.value)}
          required
        />

        <label>Durée (en minutes) :</label>
        <input
          type="number"
          value={duree}
          onChange={(e) => setDuree(e.target.value)}
          required
        />

        <label>Date de Début :</label>
        <input
          type="date"
          value={dateDepot}
          onChange={(e) => setDateDepot(e.target.value)}
          required
        />

        <label>Date Limite :</label>
        <input
          type="date"
          value={dateLimite}
          onChange={(e) => setDateLimite(e.target.value)}
          required
        />

        <label>Télécharger un fichier (PDF/TXT) :</label>
        <input
          type="file"
          accept=".pdf,.txt"
          onChange={(e) => setFichier(e.target.files[0])}
        />

        <button type="submit">Créer le Devoir</button>
      </form>
    </div>
  );
}

export default CreerDevoir;