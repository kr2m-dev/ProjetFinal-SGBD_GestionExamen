import React from 'react';
import { useNavigate } from 'react-router-dom';

function RoleSelection() {
  const navigate = useNavigate();

  const handleRoleSelection = (role) => {
    localStorage.setItem('role', role);
    navigate('/login');
  };

  return (
    <div 
      className="h-screen flex items-center justify-center bg-cover bg-center" 
      style={{ backgroundImage: "url('/images/exam-background.jpg')" }}
    >
      <div className="absolute inset-0 bg-black bg-opacity-50"></div>
      <div className="relative p-10 bg-white bg-opacity-95 shadow-2xl rounded-2xl w-full max-w-lg text-center">
        <h1 className="text-4xl font-extrabold text-gray-900 mb-6">
          Bienvenue sur la plateforme de gestion des examens
        </h1>
        <p className="text-lg text-gray-700 mb-6">
          Veuillez choisir votre rôle pour continuer :
        </p>
        <div className="flex flex-col gap-4">
          <button
            onClick={() => handleRoleSelection('student')}
            className="w-full px-6 py-3 text-lg font-semibold text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition duration-300"
          >
            Étudiant
          </button>
          <button
            onClick={() => handleRoleSelection('enseignant')}
            className="w-full px-6 py-3 text-lg font-semibold text-white bg-green-600 rounded-lg hover:bg-green-700 transition duration-300"
          >
            Enseignant
          </button>
        </div>
      </div>
    </div>
  );
}

export default RoleSelection;