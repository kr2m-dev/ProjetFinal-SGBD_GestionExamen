import { useEffect, useState } from "react";
import { fetchStudentGrades } from "../services/NoteService";

const GradesList = () => {
  const [grades, setGrades] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchStudentGrades()
      .then((data) => {
        setGrades(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Erreur lors du chargement des notes", error);
        setLoading(false);
      });
  }, []);

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Vos Notes</h2>
      {loading ? (
        <p>Chargement des notes...</p>
      ) : grades.length === 0 ? (
        <p>Aucune note disponible.</p>
      ) : (
        <ul>
          {grades.map((grade) => (
            <li key={grade.id} className="mb-4 border p-4 rounded">
              <span className="font-semibold">{grade.examTitle}</span> - 
              <span className="ml-2 text-green-600 font-bold">{grade.score}/20</span>
              <p className="text-gray-600 italic">Commentaire : {grade.comment}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default GradesList;
