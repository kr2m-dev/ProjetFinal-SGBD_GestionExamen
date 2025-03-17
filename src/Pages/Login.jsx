import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function Login() {
  const [credentials, setCredentials] = useState({ email: '', password: '', who: '' });
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Envoi de la requête de connexion au serveur
      const response = await axios.post('http://localhost:5000/login', credentials);
      
      // Stocker l'ID de l'utilisateur et d'autres informations dans localStorage
      localStorage.setItem('userId', response.data.id);
      localStorage.setItem('prenom', response.data.prenom);
      localStorage.setItem('nom', response.data.nom);
      localStorage.setItem('email', response.data.email);
      localStorage.setItem('who', credentials.who); // Pour savoir si c'est un étudiant ou un enseignant
      
      // Rediriger vers le dashboard
      navigate('/dashboard');
    } catch (error) {
      console.error('Erreur de connexion:', error);
    }
  };

  return (
    <div className="login-container">
      <h1>Connexion</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Email"
          value={credentials.email}
          onChange={(e) => setCredentials({ ...credentials, email: e.target.value })}
        />
        <input
          type="password"
          placeholder="Mot de passe"
          value={credentials.password}
          onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
        />
        <select
          value={credentials.who}
          onChange={(e) => setCredentials({ ...credentials, who: e.target.value })}
        >
          <option value="etudiant">Étudiant</option>
          <option value="enseignant">Enseignant</option>
        </select>
        <button type="submit">Se connecter</button>
      </form>
    </div>
  );
}

export default Login;
