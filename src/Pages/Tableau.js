import React, { useState, useEffect } from "react";
import {
  HomeIcon,
  BookOpenIcon,
  ClipboardDocumentListIcon,
  UserIcon,
} from "@heroicons/react/24/outline";
import Navigation from "../Components/Navigation";
import ListExam from "../Components/ListExam";
import SoumetExam from "../Components/SoumetExam";
import NoteList from "../Components/NoteList";
import Profil from "../Components/Profil";
import Chatbot from "../Components/Chatbot";
import Accueil from "../Components/1Accueil";

function Tableau() {
  const [role, setRole] = useState("");
  const [selectedSection, setSelectedSection] = useState("Accueil");

  useEffect(() => {
    const storedRole = localStorage.getItem("role");
    setRole(storedRole);
  }, []);

  if (!role)
    return (
      <div className="flex justify-center items-center h-screen text-2xl font-bold text-gray-700">
        Chargement...
      </div>
    );

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-72 bg-white shadow-xl p-8 flex flex-col rounded-r-lg">
        <h2 className="text-4xl font-extrabold text-blue-600 mb-8">Dashboard</h2>
        <nav className="space-y-6">
          <NavItem icon={<HomeIcon className="h-8 w-8" />} text="Accueil" onClick={() => setSelectedSection("Accueil")} />
          <NavItem icon={<BookOpenIcon className="h-8 w-8" />} text="Examens" onClick={() => setSelectedSection("Examens")} />
          <NavItem icon={<ClipboardDocumentListIcon className="h-8 w-8" />} text="Notes" onClick={() => setSelectedSection("Notes")} />
          <NavItem icon={<UserIcon className="h-8 w-8" />} text="Profil" onClick={() => setSelectedSection("Profil")} />
        </nav>
      </aside>

      {/* Contenu principal */}
      <main className="flex-1 p-10 bg-white shadow-md rounded-lg m-8">
        <Navigation role={role} />
        <h2 className="text-5xl font-extrabold text-gray-800 mb-8">
          {role === "teacher" ? "Gérer les examens" : "Tableau de Bord Étudiant"}
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Accueil */}
          {selectedSection === "Accueil" && (
            <Card title="Accueil">
              <Accueil />
            </Card>
          )}

          {/* Examens disponibles */}
          {selectedSection === "Examens" && (
            <Card title="Examens disponibles">
              <ListExam role={role} />
            </Card>
          )}

          {/* Notes */}
          {selectedSection === "Notes" && role !== "teacher" && (
            <Card title="Vos Notes" fullWidth>
              <NoteList />
            </Card>
          )}

          {/* Profil */}
          {selectedSection === "Profil" && (
            <Card title="Profil">
              <Profil />
            </Card>
          )}
        </div>
        
        {/* Chatbot seulement pour Examens et Notes */}
        {(selectedSection === "Examens" || selectedSection === "Notes") && (
          <div className="mt-8">
            <Card title="Chatbot - Posez vos questions">
              <Chatbot />
            </Card>
          </div>
        )}
      </main>
    </div>
  );
}

// Composant pour les cartes
const Card = ({ title, children, fullWidth }) => (
  <div className={`bg-white shadow-lg rounded-lg p-8 border border-gray-300 ${fullWidth ? "col-span-2" : ""}`}>
    <h3 className="text-2xl font-bold text-gray-700 mb-6">{title}</h3>
    {children}
  </div>
);

// Composant pour les éléments du menu
const NavItem = ({ icon, text, onClick }) => (
  <div
    className="flex items-center space-x-4 p-4 text-gray-700 hover:text-blue-600 hover:bg-gray-100 rounded-lg cursor-pointer transition text-xl font-semibold"
    onClick={onClick}
  >
    {icon}
    <span>{text}</span>
  </div>
);

export default Tableau;
