import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Login({ setIsAuthenticated }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState(localStorage.getItem('role') || 'student' || 'enseignant');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      // Simulation d'une requête API
      // À remplacer par votre véritable appel API
      const response = await simulateApiCall({ email, password, role });
      
      if (response.success) {
        localStorage.setItem('token', response.token);
        localStorage.setItem('role', role);
        setIsAuthenticated(true);
        navigate(`/dashboard/${role}`);
      } else {
        setError('Identifiants invalides');
      }
    } catch (err) {
      setError('Une erreur est survenue. Veuillez réessayer.');
    } finally {
      setIsLoading(false);
    }
  };

  // Simulation d'une requête API (à remplacer par votre vraie API)
  const simulateApiCall = async (credentials) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          success: true,
          token: 'fake-token-' + Math.random()
        });
      }, 1000);
    });
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-light">
      <div className="custom-card">
        <h1 className="text-3xl font-bold mb-4">Connexion</h1>
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
            {error}
          </div>
        )}
        <form onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-3 mb-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
            required
            disabled={isLoading}
          />
          <input
            type="password"
            placeholder="Mot de passe"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-3 mb-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
            required
            disabled={isLoading}
          />
          <select
            value={role}
            onChange={(e) => setRole(e.target.value)}
            className="w-full p-3 mb-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary"
            disabled={isLoading}
          >
            <option value="student">Étudiant</option>
            <option value="teacher">Enseignant</option>
          </select>
          <button
            type="submit"
            className={`custom-button bg-primary w-full ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
            disabled={isLoading}
          >
            {isLoading ? 'Connexion en cours...' : 'Se connecter'}
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;