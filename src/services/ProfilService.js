export const getProfil = async () => {
    // Simulation des données en attendant le backend
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          nom: "Doe",
          prenom: "John",
          email: "john.doe@example.com",
          numeroEtudiant: "123456",
          classe: "Informatique - L3",
        });
      }, 1000);
    });
  };
  