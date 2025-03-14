import React from 'react';

function ListeDevoirs({ setView }) {
  const devoirs = [
    // Exemple de données
    { id: 1, matiere: 'Mathématiques', duree: 60, dateDepot: '2023-10-01', dateLimite: '2023-10-10' },
    { id: 2, matiere: 'Physique', duree: 45, dateDepot: '2023-10-05', dateLimite: '2023-10-15' },
  ];

  return (
    <div className="liste-devoirs">
      <h2>Liste des Devoirs</h2>
      <ul>
        {devoirs.map((devoir) => (
          <li key={devoir.id}>
            <strong>{devoir.matiere}</strong> - Durée : {devoir.duree} min
            <button onClick={() => setView('consulter')}>Consulter les Copies</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ListeDevoirs;