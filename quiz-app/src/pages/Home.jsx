import React, { useState } from 'react';
import StartGameCard from '../components/StartGameCard';
import { useNavigate} from 'react-router-dom';
import axios from 'axios';

const Home = () => {
  const [name, setName] = useState('');
  const navigate = useNavigate();

  const handleStartGame = async () => {
    if (name.trim() !== '') {
      // Logic to start the game can be added here
      console.log(`Starting game for ${name}`);
      // Se crea el usuario
      await createUser();
       // Redirigir a la página de Game
       navigate('/juego');
    } else {
      alert('Please enter your name');
    }
  };

  const createUser = async () => {
    try {
      const url = 'http://localhost:8080/api/users';
      const body = {
        name: name,
        score: 0,
      };

      const response = await axios.post(url, body);
      console.log(response.data);
        
    }catch (error) {
      console.log(error);
    }
  } 

  return (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      <h1>Quizzo</h1>
      <input
        type="text"
        placeholder="Enter your name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        style={{ padding: '10px', fontSize: '16px', marginBottom: '20px' }}
      />
      <br />
      <button
        onClick={handleStartGame}
        style={{ padding: '10px 20px', fontSize: '16px' }}
      >
        Start Game
      </button>
    </div>
  );
};

export default Home;
