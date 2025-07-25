const API_URL = 'https://chatbot-backend-y8bz.onrender.com';

export const askQuestion = async (question) => {
  const response = await fetch(`${API_URL}/ask`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ question }),
  });

  if (!response.ok) {
    throw new Error('Error al obtener respuesta');
  }

  const data = await response.json();
  return data.answer;
};