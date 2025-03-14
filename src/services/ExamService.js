import { MockExam } from "../data/MockExam";
 


const USE_MOCK = true; // Change à false quand l'API backend est prête

export const fetchExams = async () => {
  if (USE_MOCK) {
    return new Promise((resolve) => setTimeout(() => resolve(MockExam), 500));
  } else {
    const response = await fetch("http://backend-url/api/exams");
    if (!response.ok) throw new Error("Erreur de chargement");
    return await response.json();
  }
};
