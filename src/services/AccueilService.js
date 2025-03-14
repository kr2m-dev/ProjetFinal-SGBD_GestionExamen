export const getAccueilData = async () => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          prenom: "Jean", // Simulé, à récupérer du backend plus tard
          notifications: [
            "Un nouvel examen de Mathématiques est disponible.",
            "L'examen de Physique est désormais en ligne.",
            "Un nouvel examen d'Informatique a été ajouté."
          ]
        });
      }, 1000);
    });
  };
  