import React, { useState, useEffect } from "react";
import { getProfil } from "../services/ProfilService";
import { UserCircleIcon } from "@heroicons/react/24/solid";

function Profil() {
  const [profil, setProfil] = useState(null);

  useEffect(() => {
    const fetchProfil = async () => {
      const data = await getProfil();
      setProfil(data);
    };
    fetchProfil();
  }, []);

  if (!profil) {
    return <div className="text-center text-gray-500">Chargement des informations...</div>;
  }

  return (
    <div className="bg-white shadow-lg rounded-lg p-8 max-w-md mx-auto text-center">
      <div className="flex flex-col items-center mb-6">
        <UserCircleIcon className="h-24 w-24 text-gray-400" />
        <h3 className="text-2xl font-semibold text-gray-800 mt-4">{profil.prenom} {profil.nom}</h3>
        <p className="text-gray-600">Étudiant en {profil.classe}</p>
      </div>
      <div className="text-left space-y-3 border-t pt-4">
        <p className="text-lg"><strong className="text-gray-700">Email :</strong> {profil.email}</p>
        <p className="text-lg"><strong className="text-gray-700">Numéro d'étudiant :</strong> {profil.numeroEtudiant}</p>
        <p className="text-lg"><strong className="text-gray-700">Classe/Niveau :</strong> {profil.classe}</p>
      </div>
    </div>
  );
}

export default Profil;
