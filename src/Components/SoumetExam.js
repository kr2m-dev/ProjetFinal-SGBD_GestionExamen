import { useState } from "react";
import { uploadExamResponse } from "../services/SoumissionFormulaire";
import { useLocation } from "react-router-dom";

const SoumetExam = ({ examId }) => {
  const locate = useLocation();
  const { user } = locate.state || {}; // Récupérer l'identifiant de l'etudiant
  const etuId = user?.id;
  console.log(`📝 Rendering SoumetExam pour examId: ${examId}`);

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
      await uploadExamResponse(file, examId,etuId);
      setMessage("📂 Copie soumise avec succès !");
      setFile(null);
    } catch (error) {
      setMessage("❌ Échec de l'envoi du fichier.");
    }
  };

  return (
    <div className="p-4 border rounded">
      <h2 className="text-lg font-bold mb-2">Soumettre votre copie</h2>
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
