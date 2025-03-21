import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from "framer-motion";
import User from './User';
import Footer from './Footer';
import logo from "./../Images/logo.jpeg";
import studentImg from "./../Images/student.png";
import teacherImg from "./../Images/teacher.png";
import '../App.css';

function Accueil() {
  const navigate = useNavigate(); // Hook pour la navigation

  // Fonction pour gérer la redirection avec le choix utilisateur
  const handleNavigation = (role) => {
    navigate(`/connexion?role=${role}`); // Passe le rôle en paramètre d'URL
  };

  return (
    <div style={styles.container}>
      {/* Header */}
      <motion.header 
        style={styles.header}
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <div style={styles.headerContent}>
          <motion.img 
            src={logo} 
            alt="Logo" 
            style={styles.logo} 
            whileHover={{ scale: 1.1 }}
          />
          <h1 style={styles.title}>
            Ensemble, passons chaque examen.
          </h1>
        </div>
      </motion.header>

      {/* Présentation */}
      <motion.section 
        style={styles.presentation}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <div style={styles.presentationContent}>
          <p>
            Bienvenue sur <span style={styles.highlight}>GoodExam</span>, la plateforme innovante qui révolutionne la manière de passer et de gérer vos examens. <br />
            Que vous soyez étudiant ou enseignant, notre outil est conçu pour vous accompagner à chaque étape de votre parcours d'évaluation. <br />
            Avec des fonctionnalités intuitives, des ressources adaptées et un suivi personnalisé, <span style={styles.highlight}>GoodExam</span> vous offre tout ce dont vous avez besoin pour réussir en toute confiance.
          </p>
          <p style={styles.subtext}>Prêt à transformer vos efforts en résultats ? Découvrez dès maintenant une nouvelle façon de tester et d'exceller.</p>
        </div>
      </motion.section>

      {/* Options */}
      <section style={styles.optionSection}>
        <div style={styles.optionContainer}>
          <motion.div 
            style={styles.optionCard}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <img src={studentImg} alt="Étudiant" style={styles.optionImg} />
            <h3>Étudiant</h3>
            <p>Progresser à ton rythme et décrocher la réussite que tu mérites.</p>
            <User choix="etudiant">  <button style={{ ...styles.button, width: "100%" }} onClick={() => handleNavigation('etudiant')}>Let's Go</button></User>
          </motion.div>

          <motion.div 
            style={styles.optionCard}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <img src={teacherImg} alt="Enseignant" style={styles.optionImg} />
            <h3>Enseignant</h3>
            <p>Gérez vos examens en toute simplicité, tout en offrant à vos étudiants un suivi personnalisé.</p>
            <User choix="enseignant"> <button style={{ ...styles.button, width: "100%" }} onClick={() => handleNavigation('enseignant')}>Let's Go</button> </User>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
}

export default Accueil;

// Styles
const styles = {
  container: {
    fontFamily: "Arial, sans-serif",
    margin: 0,
    padding: 0,
    backgroundColor: "#f9f9f9",
    color: "#333",
    lineHeight: "1.6",
  },
  header: {
    background: "linear-gradient(to right, #3b82f6, #6366f1)",
    color: "white",
    textAlign: "center",
    padding: "2rem 0",
    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
    position: "relative",
    overflow: "hidden",
  },
  headerContent: {
    position: "relative",
    zIndex: 1,
    padding: "0 20px",
  },
  logo: {
    width: "70px",
    borderRadius: "50%",
    marginBottom: "1rem",
    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.2)",
    transition: "transform 0.3s ease-in-out",
  },
  title: {
    fontSize: "2.5rem",
    fontWeight: "bold",
    marginBottom: "0.5rem",
    letterSpacing: "1px",
  },
  presentation: {
    backgroundColor: "#fff",
    padding: "3rem 20px",
    textAlign: "center",
  },
  presentationContent: {
    maxWidth: "800px",
    margin: "0 auto",
  },
  highlight: {
    color: "#007bff",
    fontWeight: "bold",
  },
  subtext: {
    fontSize: "1.2rem",
    fontWeight: "500",
    marginTop: "1.5rem",
  },
  optionSection: {
    padding: "4rem 20px",
    backgroundColor: "#f9f9f9",
  },
  optionContainer: {
    display: "flex",
    justifyContent: "center",
    gap: "2rem",
    flexWrap: "wrap",
  },
  optionCard: {
    backgroundColor: "#fff",
    borderRadius: "10px",
    padding: "2rem",
    textAlign: "center",
    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
    transition: "transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out",
    width: "300px",
  },
  optionImg: {
    width: "80px",
    marginBottom: "1rem",
  },
  button: {
    display: "inline-block",
    padding: "0.75rem 1.5rem",
    backgroundColor: "#007bff",
    color: "white",
    borderRadius: "5px",
    textDecoration: "none",
    marginTop: "1.5rem",
    transition: "background-color 0.3s ease-in-out",
    cursor: "pointer",
    border: "none",
    fontSize: "1rem",
  },
};
