import React, { useState } from 'react';

function ConsulterCopies() {
  const [notes, setNotes] = useState([
    // Exemple de données
    { id: 1, etudiant: 'Alice', noteIA: 15, noteFinale: 15 },
    { id: 2, etudiant: 'Bob', noteIA: 12, noteFinale: 12 },
  ]);

  const handleNoteChange = (id, nouvelleNote) => {
    setNotes((prevNotes) =>
      prevNotes.map((note) =>
        note.id === id ? { ...note, noteFinale: nouvelleNote } : note
      )
    );
  };

  return (
    <div className="consulter-copies">
      <h2>Copies des Étudiants</h2>
      <table>
        <thead>
          <tr>
            <th>Étudiant</th>
            <th>Note IA</th>
            <th>Note Finale</th>
          </tr>
        </thead>
        <tbody>
          {notes.map((note) => (
            <tr key={note.id}>
              <td>{note.etudiant}</td>
              <td>{note.noteIA}</td>
              <td>
                <input
                  type="number"
                  value={note.noteFinale}
                  onChange={(e) => handleNoteChange(note.id, e.target.value)}
                />
              </td>
              <td>
                <button type="button">VALIDER</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ConsulterCopies;