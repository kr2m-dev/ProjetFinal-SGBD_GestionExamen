import { useEffect, useState } from "react";
import { fetchExams } from "../services/ExamService";
import SoumetExam from "../Components/SoumetExam"; // Vérifie bien ce chemin

const ExamList = () => {
  const [exams, setExams] = useState([]);

  useEffect(() => {
    fetchExams()
      .then((data) => {
        console.log("✅ Examens reçus de l'API :", data); // 🔥 Vérifier les données reçues
        setExams(data);
      })
      .catch((error) =>
        console.error("❌ Erreur lors du chargement des examens", error)
      );
  }, []);

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Sujets d'examen</h2>
      {exams.length === 0 ? (
        <p>Aucun examen disponible pour le moment.</p>
      ) : (
        <ul>
          {exams.map((exam) => {
            console.log(`📌 Rendering examen: ${exam.title} - ID: ${exam.id}`); // 🔥 Vérification du rendu

            return (
              <li key={exam.id} className="mb-4 border p-4 rounded">
                <span className="font-semibold">{exam.title}</span> - {exam.teacher}
                <a href={exam.fileUrl} download className="ml-4 text-blue-500 underline">
                  Télécharger
                </a>
                <SoumetExam examId={exam.id} /> {/* ✅ Formulaire sous chaque examen */}
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
};

export default ExamList;
