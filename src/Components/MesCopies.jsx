import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";

function MesCopies() {
  const [copies, setCopies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const locate = useLocation();
  const { user } = locate.state || {};
  const Etudiant = user?.id;




  useEffect(() => {
    const fetchCopies = async () => {
      try {
        if (!Etudiant) throw new Error("Identifiant étudiant introuvable.");

        const response = await axios.get(`http://localhost:5000/api/copies/${Etudiant}`);
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

  console.log(copies);

  return (
    <div className="grid gap-6">
      {copies.map((copy, index) => (
        <div key={index} className="bg-white shadow-md p-6 rounded-lg border">
          <h3 className="text-2xl font-bold text-gray-800">{copy.nomMatiere}({copy.type})</h3>
          <p className="text-lg text-gray-600">Note : <span className="font-semibold">{copy.note ?? "Non notée"}</span></p>
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