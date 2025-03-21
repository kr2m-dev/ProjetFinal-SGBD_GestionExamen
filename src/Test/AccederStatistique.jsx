import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { PieChart, Pie, Cell, Tooltip, Legend, BarChart, Bar, XAxis, YAxis, CartesianGrid } from "recharts";

const AccederStatistique = () => {
  const locate = useLocation();
  const { user } = locate.state || {};
  const idEnseignant = user?.id;

  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  const colors = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"]; // Couleurs PieChart

  useEffect(() => {
    if (!idEnseignant) return; // Évite l'appel si l'ID est indéfini

    fetch(`http://localhost:5000/api/statistiques/enseignant/${idEnseignant}`)
      .then((res) => res.json())
      .then((data) => {
        console.log("📊 Données reçues de l'API :", data);
        // Vérifier et structurer les données correctement
        const formattedDistribution = Array.isArray(data.distribution)
          ? data.distribution.map((entry) => ({
              name: entry.name,
              value: entry.value || 0,
            }))
          : [];

        setStats({
          moyenne: data.moyenne || [],
          distribution: formattedDistribution,
          tauxReussite: data.tauxReussite ?? 0,
        });
      })
      .catch((err) => console.error("❌ Erreur lors du chargement des statistiques:", err))
      .finally(() => setLoading(false));
  }, [idEnseignant]);

  if (loading) return <p>Chargement des statistiques...</p>;

  if (!stats) return <p>Aucune statistique disponible.</p>;

  return (
    <div className="statistiques">
      <h2>Statistiques de l'enseignant</h2>

      {/* 📊 Moyenne par examen */}
      <div className="graphique-container">
        <h3>Moyennes par examen</h3>
        {stats.moyenne.length > 0 ? (
          <BarChart width={500} height={300} data={stats.moyenne}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="titre" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="moyenne" fill="#8884d8" />
          </BarChart>
        ) : (
          <p>Aucune moyenne disponible.</p>
        )}
      </div>

      {/* 📊 Graphique de distribution des notes */}
      <div className="graphique-container">
        <h3>Distribution des Notes</h3>
        {stats.distribution.length > 0 ? (
          <PieChart width={400} height={300}>
            <Pie
              data={stats.distribution}
              cx="50%"
              cy="50%"
              outerRadius={100}
              fill="#8884d8"
              dataKey="value"
              label
            >
              {stats.distribution.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        ) : (
          <p>Aucune donnée de distribution disponible.</p>
        )}
      </div>

      {/* 📊 Taux de réussite */}
      <div className="graphique-container">
        <h3>Taux de réussite</h3>
        {!isNaN(stats.tauxReussite) ? (
          <p>
            <strong>{parseFloat(stats.tauxReussite).toFixed(2)}%</strong> des étudiants ont obtenu la moyenne.
          </p>
        ) : (
          <p>Aucune donnée de taux de réussite disponible.</p>
        )}
      </div>
    </div>
  );
};

export default AccederStatistique;
