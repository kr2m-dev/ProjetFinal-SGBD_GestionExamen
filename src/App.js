import React, { useState, useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Login from './Pages/Login';
import Tableau from './Pages/Tableau';
import RoleSelection from './Pages/RoleSelection';
import Accueil from "./Components/Accueil";
import Etudiant from "./Pages/Tableau";
import Enseignant from "./Pages/Enseignant";
import Connexion from "./Components/Connexion";
import Inscription from "./Components/Inscription";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [storedRole, setStoredRole] = useState(localStorage.getItem('role'));

  useEffect(() => {
    const handleStorageChange = () => {
      setStoredRole(localStorage.getItem('role'));
      setIsAuthenticated(!!localStorage.getItem('token'));
    };
    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  // Composant pour les routes protégées
  const ProtectedRoute = ({ children, allowedRole }) => {
    if (!isAuthenticated) {
      return <Navigate to="/login" />;
    }
    if (storedRole !== allowedRole) {
      return <Navigate to="/role-selection" />;
    }
    return children;
  };

  return (
    <Routes>
      {/* Routes publiques */}
      <Route path="/" element={<Accueil />} /> 
      {/* <Route path="/login" element={<Login setIsAuthenticated={setIsAuthenticated} />} /> */}
      <Route path="/role-selection" element={<RoleSelection />} />
      <Route path="/connexion" element={<Connexion />} />
      <Route path="/inscription" element={<Inscription />} />

      {/* Routes protégées */}
      <Route
        path="/etudiant"
        element={<Etudiant />}
      />
      <Route
        path="/enseignant"
        element={<Enseignant /> }
      />
    </Routes>
  );
}

export default App;