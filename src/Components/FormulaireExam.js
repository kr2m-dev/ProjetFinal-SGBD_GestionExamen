import React, { useState } from 'react';

function FormulaireExam() {
  const [titre, setTitre] = useState('');
  const [date, setDate] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`Examen "${titre}" prévu pour le ${date} ajouté.`);
    setTitre('');
    setDate('');
  };

  return (
    <form onSubmit={handleSubmit} className="bg-gray-100 p-6 rounded-lg shadow-lg mb-6">
      <h3 className="text-lg font-semibold mb-4">Ajouter un nouvel examen</h3>
      <input
        type="text"
        placeholder="Titre de l'examen"
        value={titre}
        onChange={(e) => setTitre(e.target.value)}
        className="w-full p-2 mb-4 border rounded"
        required
      />
      <input
        type="date"
        value={date}
        onChange={(e) => setDate(e.target.value)}
        className="w-full p-2 mb-4 border rounded"
        required
      />
      <button className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600">
        Ajouter l'examen
      </button>
    </form>
  );
}

export default FormulaireExam;
