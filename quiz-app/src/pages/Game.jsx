import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';

const Game = () => {
  

  const [questions, setQuestions] = useState([]);

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);

  const [selectedAnswer, setSelectedAnswer] = useState(null);

  const [isCorrect, setIsCorrect] = useState(null);

  const [correctAnswersCount, setCorrectAnswersCount] = useState(0);
  const navigate = useNavigate();

  const location = useLocation();
  const { name } = location.state; // Obtenemos el nombre del usuario pasado desde Home.jsx'

  useEffect(() => {
    const getQuestions = async () => {
      try {
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
    const correctAnswer = questions[currentQuestionIndex].answer; // Asegúrate de que esto sea consistente con tu JSON
    setSelectedAnswer(answer);
    setIsCorrect(answer === correctAnswer);

    if (answer === correctAnswer) {
      setCorrectAnswersCount((prevCount) => prevCount + 1);
      console.log('Correct!');
    }

    // Espera un poco y pasa a la siguiente pregunta
    setTimeout(() => {
        setSelectedAnswer(null);
        setIsCorrect(null);
        if (currentQuestionIndex + 1 < questions.length) {
          setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
        } else {
          const finalScore = answer === correctAnswer ? correctAnswersCount + 1 : correctAnswersCount;
          console.log('Final Score:', finalScore);
          saveUserScore(finalScore);
        }
    }, 1000); // Espera 1 segundo antes de pasar a la siguiente pregunta
};

const saveUserScore = async (finalScore) => {
  try {
    const url = 'http://localhost:8080/api/users';
    const body = {
      name: name,
      score: finalScore,
    };
    const response = await axios.post(url, body);
    console.log(response.data);
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
</div>

  );
};

export default Game;