const express = require("express");
const bcrypt = require("bcryptjs");
const cors = require("cors");
require("dotenv").config();
const db = require("./db"); // Importation de la connexion MySQL

const app = express();
app.use(cors());
app.use(express.json());

// 🚀 Route d'inscription
app.post("/register", async (req, res) => {
  const { who, prenom, nom, email, motDePasse } = req.body;

  if (!who || !prenom || !nom || !email || !motDePasse) {
    return res.status(400).json({ error: "Tous les champs sont requis !" });
  }

  let tableName;
  if (who === "etudiant") {
    tableName = "Etudiant";
  } else if (who === "enseignant") {
    tableName = "Enseignant";
  } else {
    return res.status(400).json({ error: "Type d'utilisateur invalide." });
  }

  try {
    // Vérifier si l'email existe déjà
    const checkEmailQuery = `SELECT * FROM ${tableName} WHERE email_ = ?`;
    db.query(checkEmailQuery, [email], async (err, results) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ error: "Erreur serveur" });
      }

      if (results.length > 0) {
        return res.status(400).json({ error: "Cet email est déjà utilisé !" });
      }

      // Hachage du mot de passe
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(motDePasse, salt);

      // Insérer l'utilisateur dans la base de données
      const insertQuery = `INSERT INTO ${tableName} (prenom, nom, email_, motDepasse) VALUES (?, ?, ?, ?)`;
      db.query(insertQuery, [prenom, nom, email, hashedPassword], (err, result) => {
        if (err) {
          console.error(err);
          return res.status(500).json({ error: "Erreur lors de l'inscription" });
        }
        res.status(201).json({ message: "Inscription réussie !" });
      });
    });
  } catch (error) {
    res.status(500).json({ error: "Une erreur est survenue" });
  }
});

// 🚀 Route de connexion
app.post("/login", (req, res) => {
  const { email, password, who } = req.body;

  let tableName;
  if (who === "etudiant") {
    tableName = "Etudiant";
  } else if (who === "enseignant") {
    tableName = "Enseignant";
  } else {
    return res.status(400).json({ error: "Type d'utilisateur invalide." });
  }

  const query = `SELECT * FROM ${tableName} WHERE email_ = ?`;
  db.query(query, [email], async (err, results) => {
    if (err) {
      console.error("Erreur SQL :", err);
      return res.status(500).json({ error: "Erreur serveur." });
    }

    if (results.length === 0) {
      return res.status(401).json({ error: "Email ou mot de passe incorrect." });
    }

    const user = results[0];

    // Vérifier le mot de passe
    const isMatch = await bcrypt.compare(password, user.motDepasse);
    if (!isMatch) {
      return res.status(401).json({ error: "Email ou mot de passe incorrect." });
    }

    // Retourner les infos de l'utilisateur sans le mot de passe
    res.json({
      id: user.idEtudiant || user.idEnseignant,
      prenom: user.prenom,
      nom: user.nom,
      email: user.email_,
      who,
    });
  });
});

// Lancer le serveur
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Serveur backend en écoute sur le port ${PORT}`);
});
