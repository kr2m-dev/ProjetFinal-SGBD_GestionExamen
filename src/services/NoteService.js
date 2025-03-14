export const fetchStudentGrades = async () => {
    // Simuler des données en attendant l'API backend
    const mockGrades = [
      {
        id: 1,
        examTitle: "Mathématiques - Algèbre",
        score: 15.5,
        comment: "Bonne maîtrise des concepts."
      },
      {
        id: 2,
        examTitle: "Physique - Mécanique",
        score: 12.0,
        comment: "Quelques erreurs sur les formules."
      }
    ];
  
    return new Promise((resolve) => setTimeout(() => resolve(mockGrades), 500));
  
    // Quand l'API est prête, décommente ceci :
    /*
    try {
      const response = await fetch("http://backend-url/api/student/grades");
      if (!response.ok) throw new Error("Erreur lors du chargement des notes");
      return await response.json();
    } catch (error) {
      console.error("Erreur:", error);
      throw error;
    }
    */
  };
  