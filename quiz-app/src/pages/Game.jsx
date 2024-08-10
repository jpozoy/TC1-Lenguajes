import React from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';

const Game = () => {
  
  const getQuestions = async () => {
    try {
      const url = 'http://localhost:8080/api/questions';
      const response = await axios.get(url);
      console.log(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <h1>Game Page</h1>
      <button onClick={getQuestions}>Get Questions</button>
    </div>
  );
};

export default Game;