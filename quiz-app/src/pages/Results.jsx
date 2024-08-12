import React from 'react';
import { useLocation } from 'react-router-dom';

const Results = () => {
  //Obtener la puntuación final y el total de preguntas
  const location = useLocation();
  const { totalQuestions, finalScore } = location.state;

  //Manejar los resultados, derrotado o ganador
  const handleResults = () => {
    if (finalScore >= 6) {
      return '¡Felicidades!, Ganaste';
    } else {
      return '¡Inténtalo de nuevo!, :(';
   }
  }

  return (
    <div>
      <h2 style={{color:'white', fontSize: '40px'}}>{handleResults()}</h2>
      <p style={{color:'white', fontSize: '30px'}}>Puntuacion obtenida</p>
      <p style={{color:'white', fontSize: '60px'}}>{finalScore}/10</p>
      <button style={{ padding: '10px 20px', fontSize: '16px', borderRadius: '10px', border: 'none', color: '#6813DE', backgroundColor: '#C3E2FF',margin: '0 20px 0 20px', fontWeight: '600' }} 
      onClick={() => window.location.href = '/'}>Volver al inicio</button>
    </div>
  );
};

export default Results;