/* 
voici le backend pour l'appel api a deepseek mais celle ci est payant donc on a pris celui de grok en bas 
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import fetch from "node-fetch";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5001;
const API_KEY = process.env.DEEPSEEK_API_KEY;

app.use(cors());
app.use(express.json());

app.post("/api/generate", async (req, res) => {
    console.log("📥 Requête reçue :", req.body);

    const { prompt } = req.body;
    if (!prompt) {
        return res.status(400).json({ error: "Le prompt est requis." });
    }

    try {
        const response = await fetch("https://api.deepseek.com/v1/chat/completions", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": Bearer ${API_KEY}
            },
            body: JSON.stringify({
                model: "deepseek-chat",  // ✅ Assure-toi que ce modèle est valide
                messages: [{ role: "user", content: prompt }],  // ✅ DeepSeek attend ce format
                temperature: 0.7  // ✅ Contrôle la variabilité des réponses
            })
        });

        console.log("📤 DeepSeek API appelée...");

        const data = await response.json();
        console.log("✅ Réponse DeepSeek :", data);

        res.json({ response: data.choices?.[0]?.message?.content || "Pas de réponse." });

    } catch (error) {
        console.error("❌ Erreur API DeepSeek :", error);
        res.status(500).json({ error: "Erreur serveur." });
    }
});

app.listen(PORT, () => {
    console.log(🚀 Serveur lancé sur http://localhost:${PORT});
});
*/

import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import fetch from "node-fetch";
import mysql from "mysql2";
import fs from "fs";
import pdf from "pdf-parse";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5001;
const API_KEY = process.env.DEEPSEEK_API_KEY; // Utilisation de la clé Groq

// 🔌 Connexion à la base de données
const db = mysql.createPool({
  host: process.env.DB_HOST || "localhost",
  user: process.env.DB_USER || "root",
  password: process.env.DB_PASS || "",
  database: process.env.DB_NAME || "PLATEFORME",
});

db.getConnection((err, connection) => {
  if (err) {
    console.error("❌ Erreur de connexion à la base de données :", err);
    process.exit(1); // Arrêter le serveur si la connexion échoue
  } else {
    console.log("✅ Connexion à la base de données réussie !");
    connection.release();
  }
});

app.use(cors());
app.use(express.json());

// 🔹 Endpoint IA : Générer une réponse
app.post("/api/generate", async (req, res) => {
  console.log("📥 Requête reçue :", req.body);

  const { prompt } = req.body;
  if (!prompt) {
    return res.status(400).json({ error: "Le prompt est requis." });
  }

  try {
    const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${API_KEY}`,
      },
      body: JSON.stringify({
        model: "llama3-70b-8192",
       // model: "mixtral-8x7b-32768",
        messages: [
          { role: "user", content: prompt },
          { role: "system", content: "Réponds uniquement en français." },
        ],
      }),
    });

    console.log("📤 Groq API appelée...");

    const data = await response.json();
    console.log("✅ Réponse Groq :", data);

    res.json({ response: data.choices?.[0]?.message?.content || "Pas de réponse." });

  } catch (error) {
    console.error("❌ Erreur API Groq :", error);
    res.status(500).json({ error: "Erreur serveur." });
  }
});



// 🔹 Extraction de texte depuis un fichier PDF ou TXT
async function extractTextFromFile(filePath) {
     //const fichierPath = `../uploads/${fichierPath}`;
    console.log(`📂 Chemin du fichier : ${filePath}`);
    
    if (!fs.existsSync(filePath)) {
        return res.status(404).json({ message: "Fichier non trouvé" });
    }
    

  if (filePath.endsWith(".pdf")) {
    const data = fs.readFileSync(filePath);
    const pdfData = await pdf(data);
    return pdfData.text;
  } else {
    return fs.readFileSync(filePath, "utf8");
  }
}

// 🔹 Fonction pour obtenir la correction depuis une API d'IA

import path from "path";
import { v4 as uuidv4 } from "uuid"; // Pour générer des noms uniques
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);


// Fonction pour corriger une copie individuelle
async function corrigerCopie(idCopie, idExamen, fichierCopie) {
  try {
    // Récupérer la correction de l'examen
    const getCorrectionSql = 'SELECT * FROM correction WHERE idExamen = ?';
    const correctionResults = await new Promise((resolve, reject) => {
      db.query(getCorrectionSql, [idExamen], (err, results) => {
        if (err) reject(err);
        else resolve(results);
      });
    });
    
    if (correctionResults.length === 0) {
      console.log(`❌ Aucune correction trouvée pour l'examen ${idExamen}`);
      return;
    }
    
    const correction = correctionResults[0];
    
    // Lire le fichier de correction
    const correctionFilePath = path.join(__dirname, "../corrections", correction.nomCorrige);
    const correctionContent = fs.readFileSync(correctionFilePath, 'utf8');
    console.log("la correction ",correctionContent);
    
    // Lire le contenu de la copie
    const copieFilePath = path.join(__dirname, "../MesCopies", fichierCopie);
    let copieContent;
    
    try {
      if (fichierCopie.endsWith('.pdf')) {
        const data = fs.readFileSync(copieFilePath);
        const pdfData = await pdf(data);
        copieContent = pdfData.text;
        console.log("copie de l'etudiant",copieContent);
      } else {
        copieContent = fs.readFileSync(copieFilePath, 'utf8');
        
      }
    } catch (err) {
      console.error(`❌ Erreur lors de la lecture de la copie ${idCopie}:`, err);
      return;
    }
    
    // Appeler l'API IA pour évaluer la copie
    const notePrompt = `
      Voici le corrigé de l'examen:
      ${correctionContent}
      
      Voici la copie de l'étudiant:
      ${copieContent}
      
      corrige cette copie sur 20 points par rapport a la correction . Donne uniquement la note sous forme de nombre, sans texte supplémentaire.
    `;
    
    // Appel à l'API pour évaluer
    const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${API_KEY}`,
      },
      body: JSON.stringify({
        model: "llama3-70b-8192",
        messages: [
          { role: "user", content: notePrompt },
          { role: "system", content: "Réponds uniquement par un nombre entre 0 et 20, sans texte supplémentaire." },
        ],
      }),
    });
    
    const data = await response.json();
    console.log("IA REPONSE",data);
    const noteStr = data.choices?.[0]?.message?.content || "0";
    
    // Convertir la note en nombre
    let note = parseFloat(noteStr.trim());
    if (isNaN(note) || note < 0 || note > 20) {
      note = 0; // Valeur par défaut si la note n'est pas valide
    }
    
    // Mettre à jour la note dans la base de données
    const updateNoteSql = 'UPDATE Copie SET note = ? WHERE idCopie = ?';
    await new Promise((resolve, reject) => {
      db.query(updateNoteSql, [note, idCopie], (err, result) => {
        if (err) reject(err);
        else resolve(result);
      });
    });
    
    console.log(`✅ Copie ${idCopie} corrigée avec succès ! Note: ${note}/20`);
    
  } catch (error) {
    console.error(`❌ Erreur lors de la correction de la copie ${idCopie}:`, error);
  }
}

// Modifiez la fonction getAICorrection pour sauvegarder la correction
// Modifions la route /api/correction/:id dans le fichier IA.js
app.get("/api/correction/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const examenId = parseInt(id, 10);
    console.log("valeur de la conversion ", examenId);
    const [results] = await db.promise().query("SELECT * FROM Examen WHERE idExamen = ?", [examenId]);
    console.log("📋 Résultat SQL :", results);

    if (results.length === 0) {
      return res.status(404).json({ message: "Examen non trouvé" });
    }

    const examen = results[0];
    const fichierPath = `../uploads/${examen.fichier}`;

    if (!fs.existsSync(fichierPath)) {
      return res.status(404).json({ message: "Fichier non trouvé" });
    }

    const texteExamen = await extractTextFromFile(fichierPath);
    console.log("📄 Texte extrait :", texteExamen);

    console.log("📡 Envoi à l'IA pour correction...");
    const iaCorrection = await getAICorrection(texteExamen);
    console.log("✅ Réponse IA :", iaCorrection);

    // Générer un nom unique pour le fichier de correction
    const uniqueFileName = `correction_${examenId}_${uuidv4()}.txt`;
    const correctionPath = path.join(__dirname, "../corrections", uniqueFileName);
    console.log(correctionPath);
    
    // Créer le répertoire "corrections" s'il n'existe pas
    const correctionsDir = path.join(__dirname, "../corrections");
    if (!fs.existsSync(correctionsDir)) {
      console.log("🛠 Création du dossier corrections...");
      fs.mkdirSync(correctionsDir, { recursive: true });
    }
    console.log("📂 Dossier corrections existe :", fs.existsSync(correctionsDir));
    
    // Écrire la correction dans un fichier
    fs.writeFileSync(correctionPath, iaCorrection, "utf8");
    console.log(`📝 Correction sauvegardée dans ${correctionPath}`);
    
    // Insérer ou mettre à jour l'enregistrement dans la table correction
    try {
      // Vérifier si une correction existe déjà pour cet examen
      const [existingCorrections] = await db.promise().query(
        "SELECT * FROM correction WHERE idExamen = ?", 
        [examenId]
      );
      
      if (existingCorrections.length > 0) {
        // Mise à jour de la correction existante
        await db.promise().query(
          "UPDATE correction SET nomCorrige = ? WHERE idExamen = ?",
          [uniqueFileName, examenId]
        );
        console.log("✅ Correction mise à jour dans la base de données");
      } else {
        // Insertion d'une nouvelle correction
        await db.promise().query(
          "INSERT INTO correction (nomCorrige, idExamen) VALUES (?, ?)",
          [uniqueFileName, examenId]
        );
        console.log("✅ Correction ajoutée dans la base de données");
      }
      
      // Récupérer toutes les copies non corrigées pour cet examen
      const [copies] = await db.promise().query(
        "SELECT * FROM Copie WHERE idExamen = ? AND note = 0",
        [examenId]
      );
      
      console.log(`🔍 ${copies.length} copies à corriger trouvées`);
      
      // Corriger chaque copie
      if (copies.length > 0) {
        for (const copie of copies) {
          console.log(`⚙️ Correction de la copie ${copie.idCopie}...`);
          setTimeout(() => {
            corrigerCopie(copie.idCopie, examenId, copie.fichier);
          }, 100); // Léger délai pour éviter de surcharger l'API
        }
      }
      
    } catch (dbError) {
      console.error("❌ Erreur lors de l'enregistrement en base de données :", dbError);
      // On continue car la correction a déjà été générée
    }
  
    // Modifier la réponse pour inclure le chemin du fichier
    res.json({ 
      correction: iaCorrection,
      fichierCorrection: uniqueFileName,
      //message: `Correction générée avec succès. ${copies?.length || 0} copies à corriger.`
    });

  } catch (error) {
    console.error("❌ Erreur API :", error);
    res.status(500).json({ message: "Erreur serveur" });
  }
});
 // 🔹 Fonction pour obtenir la correction depuis une API d'IA
 const getAICorrection = async (texteExamen) => {
  console.log("📡 Envoi du texte à l'IA pour correction...");
  try {
      const prompt = `Corrige cet examen : \n\n${texteExamen}. Fournis une réponse détaillée.`;
      
      const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
          method: "POST",
          headers: {
              "Content-Type": "application/json",
              "Authorization": `Bearer ${API_KEY}`,
          },
          body: JSON.stringify({
        model: "llama3-70b-8192",
        //model: "mixtral-8x7b-32768",
              messages: [
                  { role: "user", content: prompt },
                  { role: "system", content: "Réponds uniquement en français." },
              ],
          }),
      });
      
      console.log("📤 Groq API appelée...");
      
      const data = await response.json();
      console.log("✅ Réponse Groq :", data);
      
      return data.choices?.[0]?.message?.content || "Pas de correction disponible.";
      return data;
  } catch (error) {
      console.error("❌ Erreur API Groq :", error);
      return "Erreur lors de la génération de la correction.";
  }
};


// 🔥 Démarrer le serveur
app.listen(PORT, () => {
  console.log(`🚀 Serveur lancé sur http://localhost:${PORT}`);
});
