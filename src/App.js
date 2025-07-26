import React, { useState } from 'react';
import './styles.css'; // Asegúrate que la ruta sea correcta

const Chat = () => {
  const [messages, setMessages] = useState([
    { text: "¡Bienvenido! Sube documentos PDF en la página de administración para comenzar.", isUser: false }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!input.trim() || loading) return;

    // Agregar mensaje del usuario
    setMessages(prev => [...prev, { text: input, isUser: true }]);
    setInput('');
    setLoading(true);

    try {
      const response = await fetch('https://chatbot-backend-y8bz.onrender.com/ask', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({ question: input })
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.detail || 'Error en el servidor');
      }

      const data = await response.json();
      setMessages(prev => [...prev, { text: data.answer, isUser: false }]);
    } catch (error) {
      setMessages(prev => [...prev, { 
        text: `Error: ${error.message.includes('carga documentos') ? 
               'Primero carga documentos PDF en la página de administración' : 
               error.message}`,
        isUser: false 
      }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="chat-container">
      <div className="messages">
        {messages.map((msg, index) => (
          <div key={index} className={`message ${msg.isUser ? 'user' : 'bot'}`}>
            {msg.text}
          </div>
        ))}
        {loading && <div className="message bot">Pensando...</div>}
      </div>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Escribe tu pregunta sobre el PDF..."
          disabled={loading}
        />
        <button type="submit" disabled={loading}>
          {loading ? 'Enviando...' : 'Enviar'}
        </button>
      </form>
    </div>
  );
};

export default Chat;