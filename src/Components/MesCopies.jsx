import React, { useState, useEffect } from "react";
import axios from "axios";

function MesCopies() {
  const [copies, setCopies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCopies = async () => {
      try {
        const studentId = localStorage.getItem("studentId");
        if (!studentId) throw new Error("Identifiant étudiant introuvable.");

        const response = await axios.get(`http://localhost:5000/api/copies?studentId=${studentId}`);
        setCopies(response.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCopies();
  }, []);

  if (loading) return <div className="text-center text-gray-600">Chargement des copies...</div>;
  if (error) return <div className="text-red-500 text-center">{error}</div>;
  if (copies.length === 0) return <div className="text-center text-gray-600">Aucune copie trouvée.</div>;

  return (
    <div className="grid gap-6">
      {copies.map((copy, index) => (
        <div key={index} className="bg-white shadow-md p-6 rounded-lg border">
          <h3 className="text-2xl font-bold text-gray-800">{copy.nomMatiere}</h3>
          <p className="text-lg text-gray-600">Note : <span className="font-semibold">{copy.noteFinale ?? "Non notée"}</span></p>
          {copy.correctionUrl && (
            <a
              href={copy.correctionUrl}
              download
              className="mt-4 inline-block bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
            >
              Télécharger la correction
            </a>
          )}
        </div>
      ))}
    </div>
  );
}

export default MesCopies;

//le back end
// app.get("/api/copies", async (req, res) => {
//   const { studentId } = req.query;
//   if (!studentId) return res.status(400).json({ error: "Identifiant étudiant requis." });

//   try {
//     const query = `
//       SELECT 
//         M.nomMatiere, 
//         C.noteFinale, 
//         Corr.corrige AS correctionUrl
//       FROM Copie C
//       JOIN recevoir R ON C.idCopie = R.idCopie
//       JOIN Examen E ON R.idExamen = E.idExamen
//       JOIN Correction Corr ON E.idCorrection = Corr.idCorrection
//       JOIN composer_ Co ON E.idExamen = Co.idExamen
//       JOIN Matiere M ON Co.idMatiere = M.idMatiere
//       WHERE Co.idEtudiant = ?;
//     `;

//     const [copies] = await db.execute(query, [studentId]);
//     res.json(copies);
//   } catch (error) {
//     res.status(500).json({ error: "Erreur serveur." });
//   }
// });
