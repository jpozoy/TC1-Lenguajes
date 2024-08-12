import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';

const Game = () => {
  
  // Se inicializan los estados
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [isCorrect, setIsCorrect] = useState(null);
  const [correctAnswersCount, setCorrectAnswersCount] = useState(0);

  // Se obtiene el nombre del usuario y se inicializan las rutas
  const navigate = useNavigate();
  const location = useLocation();
  const { name } = location.state;

  // Se realiza la consulta de las preguntas al servidor
  useEffect(() => {
    const getQuestions = async () => {
      try {
        //Ruta de la "API"
        const url = 'http://localhost:8080/api/questions';
        const response = await axios.get(url);
        
        setQuestions(response.data);

      } catch (error) {
        console.log(error);
      }
    };


    getQuestions();
  }, []);

  const handleAnswerClick = (answer) => {
    const correctAnswer = questions[currentQuestionIndex].answer;
    setSelectedAnswer(answer);
    setIsCorrect(answer === correctAnswer);

    if (answer === correctAnswer) {
      setCorrectAnswersCount((prevCount) => prevCount + 1);
    }

    // Espera un poco y pasa a la siguiente pregunta
    setTimeout(() => {
        setSelectedAnswer(null);
        setIsCorrect(null);
        // Si hay más preguntas, pasa a la siguiente
        if (currentQuestionIndex + 1 < questions.length) {
          setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
        } else {
          //Evaluar la ultima pregunta
          const finalScore = answer === correctAnswer ? correctAnswersCount + 1 : correctAnswersCount;
          // Guardar la puntuación del usuario
          saveUserScore(finalScore);
        }
    }, 1000); // cooldown de 1 segundo
};

const saveUserScore = async (finalScore) => {
  // Guardar la puntuación del usuario, en el servidor
  try {
    const url = 'http://localhost:8080/api/users';
    const body = {
      name: name,
      score: finalScore,
    };
    const response = await axios.post(url, body);

    // Redirigir a la página de resultados
    navigate('/results', { state: { totalQuestions: questions.length, finalScore } });
  } catch (error) {
    console.log(error);
  }
};

  // Obtener la pregunta y opciones actuales
  const currentQuestion = questions[currentQuestionIndex];

  // Manejar el caso cuando `currentQuestion` es undefined
  if (!currentQuestion) {
    return <div>Loading...</div>;
  }

  return (
  <div >
    <h1 style={{color: 'white'}}>Pregunta {currentQuestionIndex + 1}/10</h1>
    <h2 style={{color: 'white'}}>{currentQuestion.question}</h2>
    <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
      {currentQuestion.options.map((option, index) => (
        <button
          key={index}
          onClick={() => handleAnswerClick(option)}
          style={{
            fontSize: '16px',
            fontWeight: 'bold',
            padding: '15px 30px',  
            width: '250px',         
            alignSelf: 'center',
            border: 'none',
            borderRadius: '5px', 
            backgroundColor:
              selectedAnswer === option
                ? isCorrect
                  ? '#C3E2FF'
                  : '#FFB0BA'
                : 'white',
            color: selectedAnswer === option ? 'white' : 'black',
            pointerEvents: selectedAnswer ? 'none' : 'auto',
          }}
        >
          {option}
        </button>
      ))}
    </div>
    <h2 style={{color: 'white', marginTop: '40px'}}>Partida de {name}</h2>
  </div>
  );
};

export default Game;