export const getChatbotResponse = async (message) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        let response;
        if (message.toLowerCase().includes("examen")) {
          response = "Les examens disponibles sont listés dans la section Examens.";
        } else if (message.toLowerCase().includes("note")) {
          response = "Vos notes sont accessibles dans la section Notes.";
        } else if (message.toLowerCase().includes("bonjour")) {
          response = "Bonjour ! Comment puis-je vous aider ?";
        } else {
          response = "Je suis un chatbot simulé. Un backend sera bientôt intégré !";
        }
        resolve({ text: response, sender: "bot" });
      }, 1000);
    });
  };
  