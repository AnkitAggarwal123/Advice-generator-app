// src/AdviceGenerator.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Advice.css';
import diceIcon from './icon-dice.svg';
import dividerPattern from './pattern-divider-desktop.svg';

const AdviceGenerator = () => {
  const [advice, setAdvice] = useState('');
  const [adviceId, setAdviceId] = useState('');
  const [loading, setLoading] = useState(true);

  const fetchAdvice = async () => {
    setLoading(true);
    try {
      const response = await axios.get('https://api.adviceslip.com/advice');
      setAdvice(response.data.slip.advice);
      setAdviceId(response.data.slip.id);
    } catch (error) {
      console.error('Error fetching advice:', error);
      setAdvice('Failed to fetch advice. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAdvice();
  }, []);

  return (
    <div className="advice-container">
      <h1 className="advice-header">Advice #{adviceId}</h1>
      <div className="advice-box">
        {loading ? <p>Loading...</p> : <p>"{advice}"</p>}
      </div>
      <img src={dividerPattern} alt="Divider" className="divider-pattern" />
      <button className="advice-button" onClick={fetchAdvice}>
        <img src={diceIcon} alt="Get New Advice" />
      </button>
    </div>
  );
};

export default AdviceGenerator;
