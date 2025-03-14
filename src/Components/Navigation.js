import React from 'react';
import { Link } from 'react-router-dom';

function Navigation({ role }) {
  return (
    <nav className="bg-blue-600 p-4 flex justify-between items-center text-white">
      <h1 className="text-xl font-bold">Plateforme Examens</h1>
      <div className="space-x-4">
        <Link to="/dashboard" className="hover:text-gray-200">Tableau de bord</Link>
        {role === 'enseignant' && <Link to="/stats" className="hover:text-gray-200">Statistiques</Link>}
        <Link to="/" className="hover:text-gray-200">Déconnexion</Link>
      </div>
    </nav>
  );
}

export default Navigation;
