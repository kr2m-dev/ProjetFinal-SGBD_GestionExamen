import { useState } from "react";
import { uploadExamResponse } from "../services/SoumissionFormulaire";

const SoumetExam = ({ examId }) => {
  console.log(`📝 Rendering SoumetExam pour examId: ${examId}`); // 🔥 Vérification du nombre de formulaires affichés

  const [file, setFile] = useState(null);
  const [message, setMessage] = useState("");

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!file) {
      setMessage("Veuillez sélectionner un fichier PDF.");
      return;
    }

    try {
      await uploadExamResponse(file, examId);
      setMessage("Fichier envoyé avec succès !");
      setFile(null);
    } catch (error) {
      setMessage("Échec de l'envoi du fichier.");
    }
  };

  return (
    <div className="p-4 border rounded">
      <h2 className="text-lg font-bold mb-2">Soumettre votre réponse</h2>
      <input type="file" accept="application/pdf" onChange={handleFileChange} />
      <button
        onClick={handleSubmit}
        className="ml-2 p-2 bg-blue-500 text-white rounded"
      >
        Envoyer
      </button>
      {message && <p className="mt-2 text-sm">{message}</p>}
    </div>
  );
};

export default SoumetExam;
