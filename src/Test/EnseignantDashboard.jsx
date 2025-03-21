import React, { useState } from 'react';
import './styles.css';
import CreerDevoir from './CreerDevoir';
import ListeDevoirs from './ListeDevoirs';
import ConsulterCopies from './ConsulterCopies';
import AccederStatistique from './AccederStatistique';

function EnseignantDashboard() {
  const [view, setView] = useState('creer');
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [hoveredItem, setHoveredItem] = useState(null);

  const toggleSidebar = () => {
    setIsSidebarCollapsed(!isSidebarCollapsed);
  };

  // Style dynamique pour le survol
  const getItemStyle = (itemView) => ({
    ...styles.sidebarItem,
    ...(view === itemView && styles.sidebarItemActive),
    paddingLeft: isSidebarCollapsed ? '10px' : '20px',
    backgroundColor: hoveredItem === itemView ? '#455a64' : 'transparent',
    transition: 'all 0.3s ease'
  });

  return (
    <div style={styles.dashboardContainer}>
      {/* Barre latérale */}
      <div style={{ 
        ...styles.sidebar, 
        width: isSidebarCollapsed ? styles.sidebarCollapsed.width : styles.sidebar.width 
      }}>
        <div style={styles.sidebarHeader}>
          <button 
            style={styles.menuToggleButton} 
            onClick={toggleSidebar}
            onMouseEnter={() => setHoveredItem('menu')}
            onMouseLeave={() => setHoveredItem(null)}
          >
            ☰
          </button>
        </div>
        <ul style={styles.sidebarMenu}>
          <li 
            style={getItemStyle('creer')}
            onClick={() => setView('creer')}
            onMouseEnter={() => setHoveredItem('creer')}
            onMouseLeave={() => setHoveredItem(null)}
          >
            <i className="fas fa-plus-square" style={styles.icon}></i>
            <span style={{ display: isSidebarCollapsed ? 'none' : 'inline' }}>Création</span>
          </li>

          <li 
            style={getItemStyle('liste')}
            onClick={() => setView('liste')}
            onMouseEnter={() => setHoveredItem('liste')}
            onMouseLeave={() => setHoveredItem(null)}
          >
            <i className="fas fa-list-ul" style={styles.icon}></i>
            <span style={{ display: isSidebarCollapsed ? 'none' : 'inline' }}>Liste</span>
          </li>

          <li 
            style={getItemStyle('consulter')}
            onClick={() => setView('consulter')}
            onMouseEnter={() => setHoveredItem('consulter')}
            onMouseLeave={() => setHoveredItem(null)}
          >
            <i className="fas fa-file-alt" style={styles.icon}></i>
            <span style={{ display: isSidebarCollapsed ? 'none' : 'inline' }}>Consultation</span>
          </li>

          <li 
            style={getItemStyle('statistiques')}
            onClick={() => setView('statistiques')}
            onMouseEnter={() => setHoveredItem('statistiques')}
            onMouseLeave={() => setHoveredItem(null)}
          >
            <i className="fas fa-chart-bar" style={styles.icon}></i>
            <span style={{ display: isSidebarCollapsed ? 'none' : 'inline' }}>Statistiques</span>
          </li>
        </ul>
      </div>

      {/* Contenu principal */}
      <div style={{ 
        ...styles.mainContent, 
        marginLeft: isSidebarCollapsed ? styles.sidebarCollapsed.width : styles.sidebar.width 
      }}>
        {view === 'creer' && <CreerDevoir />}
        {view === 'liste' && <ListeDevoirs setView={setView} />}
        {view === 'consulter' && <ConsulterCopies />}
        {view === 'statistiques' && <AccederStatistique />}
      </div>
    </div>
  );
}

const styles = {
  dashboardContainer: {
    display: "flex",
    minHeight: "100vh",
  },
  sidebar: {
    position: "fixed",
    left: "0",
    top: "0",
    height: "100vh",
    backgroundColor: "#34495e",
    color: "#fff",
    width: "250px",
    transition: "width 0.3s ease",
    boxShadow: "2px 0 5px rgba(0, 0, 0, 0.2)",
    display: "flex",
    flexDirection: "column",
    overflow: "hidden",
    zIndex: 1000,
  },
  sidebarCollapsed: {
    width: "70px",
  },
  sidebarHeader: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "15px",
  },
  menuToggleButton: {
    background: "none",
    border: "none",
    padding: "10px",
    fontSize: "24px",
    color: "#fff",
    cursor: "pointer",
    transition: "all 0.3s ease",
    ':hover': {
      color: "#ddd",
    }
  },
  sidebarMenu: {
    listStyle: "none",
    padding: 0,
    margin: 0,
    flexGrow: 1,
    display: "flex",
    flexDirection: "column",
  },
  sidebarItem: {
    padding: "15px 20px",
    textDecoration: "none",
    color: "#fff",
    display: "flex",
    alignItems: "center",
    cursor: "pointer",
    borderBottom: "1px solid rgba(255, 255, 255, 0.1)",
    whiteSpace: "nowrap",
    overflow: "hidden",
  },
  sidebarItemActive: {
    backgroundColor: "#2c3e50",
  },
  icon: {
    marginRight: "10px",
    fontSize: "1.2em",
  },
  mainContent: {
    marginLeft: "250px",
    flexGrow: 1,
    padding: "20px",
    transition: "margin-left 0.3s ease",
  },
};

export default EnseignantDashboard;