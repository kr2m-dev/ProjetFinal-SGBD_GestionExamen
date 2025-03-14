export const uploadExamResponse = async (file, examId) => {
  const formData = new FormData();
  formData.append("file", file);
  formData.append("examId", examId);

  try {
    const response = await fetch("http://backend-url/api/upload", {
      method: "POST",
      body: formData,
    });

    if (!response.ok) {
      throw new Error("Erreur lors de l'envoi du fichier");
    }

    return await response.json();
  } catch (error) {
    console.error("Upload error:", error);
    throw error;
  }
};
