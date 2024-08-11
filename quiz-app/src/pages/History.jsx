import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const History = () => {
  const [results, setResults] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchResults = async () => {
      try {
        const response = await axios.get('http://localhost:8080/api/history');
        setResults(response.data);
      } catch (error) {
        console.log('Error fetching results:', error);
      }
    };

    fetchResults();
  }, []);

  const handleHome = () => {
    navigate('/');
  };

  return (
  <div style={{
    display: 'flex', 
    justifyContent: 'center', 
    alignItems: 'center', 
    height: '100vh',
    flexDirection: 'column',
  }}>
    <h1 style={{ color: 'white', marginBottom: '20px' }}>Historial</h1>
    <table style={{
      backgroundColor: 'white',
      borderRadius: '10px',
      margin: '10px',
      padding: '30px',
      boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)', // Sombra para darle profundidad
      width: '80%',
      maxWidth: '600px',
      borderSpacing: '20px 10px',
    }}>
      <thead>
        <tr>
          <th style={headerStyle}>Name</th>
          <th style={headerStyle}>Score</th>
        </tr>
      </thead>
      <tbody>
        {results.map((result, index) => (
          <tr key={index} style={rowStyle}>
            <td style={cellStyle}>{result.name}</td>
            <td style={cellStyle}>{result.score}/10</td>
          </tr>
        ))}
      </tbody>
    </table>
    <button 
      onClick={handleHome}
      style={{ padding: '10px 20px', fontSize: '16px', borderRadius: '10px', border: 'none', color: '#6813DE', backgroundColor: '#C3E2FF',margin: '0 20px 0 20px', fontWeight: '600' }}
    >
      Go Home
    </button>
  </div>

    
  );
};

const headerStyle = {
  padding: '10px 20px',
  backgroundColor: '#FFB0BA',
  color: 'white',
  fontWeight: 'bold',
  textAlign: 'center',
  borderRadius: '5px',
};

const cellStyle = {
  // padding: '10px 20px',
  textAlign: 'center',
  borderBottom: '1px solid #ddd',
};

const rowStyle = {
  backgroundColor: 'white',
  '&:nth-child(even)': {
    backgroundColor: '#f2f2f2',
  }
};

export default History;