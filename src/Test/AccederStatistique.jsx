import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, PieChart, Pie, Cell } from 'recharts';

function AccederStatistique() {
  // Données de démonstration
  const dataNotes = [
    { name: '0-5', value: 2 },
    { name: '5-10', value: 5 },
    { name: '10-15', value: 12 },
    { name: '15-20', value: 8 },
  ];

  const dataMoyennes = [
    { matiere: 'Mathématiques', moyenne: 14 },
    { matiere: 'Physique', moyenne: 12 },
    { matiere: 'Chimie', moyenne: 15 },
    { matiere: 'Informatique', moyenne: 16 },
  ];

  const colors = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042']; // Couleurs pour le PieChart

  return (
    <div className="statistiques">
      <h2>Statistiques des Notes</h2>

      {/* Graphique de distribution des notes */}
      <div className="graphique-container">
        <h3>Distribution des Notes</h3>
        <PieChart width={400} height={300}>
          <Pie
            data={dataNotes}
            cx="50%"
            cy="50%"
            outerRadius={100}
            fill="#8884d8"
            dataKey="value"
            label
          >
            {dataNotes.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
            ))}
          </Pie>
          <Tooltip />
          <Legend />
        </PieChart>
      </div>

      {/* Graphique des moyennes par matière */}
      <div className="graphique-container">
        <h3>Moyennes par Matière</h3>
        <BarChart width={500} height={300} data={dataMoyennes}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="matiere" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="moyenne" fill="#8884d8" />
        </BarChart>
      </div>
    </div>
  );
}

export default AccederStatistique;