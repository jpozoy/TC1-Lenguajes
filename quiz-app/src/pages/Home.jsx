import React, { useState } from 'react';
import { useNavigate} from 'react-router-dom';


const Home = () => {
  const [name, setName] = useState('');
  const navigate = useNavigate();

  const handleStartGame = () => {
    if (name.trim() !== '') {
      // Logic to start the game can be added here
      console.log(`Starting game for ${name}`);
      // Redirigir a la página de Game y pasar el nombre del usuario como estado
      navigate('/juego', { state: { name } });
    } else {
      alert('Please enter your name');
    }
  };

  const handleHistory = () => { 
    navigate('/history');
  };

  return (
    <div style={{ textAlign: 'center', 
      marginTop: '50px',
      color: 'white',
      display: 'flex',
      flexDirection: 'column' }}>
      <h1 style={{fontSize: '60px'}}>Quizzo</h1>
      <input
        type="text"
        placeholder="Enter your name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        style={{ padding: '10px', fontSize: '16px', marginBottom: '20px', borderRadius: '10px', border: 'none' }}
      />
      <br />
      <button
        onClick={handleStartGame}
        style={{ padding: '10px 20px', fontSize: '16px', borderRadius: '10px', border: 'none', color: '#6813DE', backgroundColor: '#C3E2FF',margin: '0 20px 0 20px', fontWeight: '600' }}
      >
        Iniciar Juego
      </button>
      <button onClick={handleHistory}
        style={{ padding: '10px 20px', 
        fontSize: '16px', 
        marginTop: '20px',
        borderRadius: '10px',
        border: 'none',
        color: '#FF475D',
        backgroundColor: '#FFB0BA',
        margin: '20px 20px 0 20px',
        fontWeight: '600'}}
      >Ver historial</button>
    </div>
  );
};

export default Home;
