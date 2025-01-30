/* eslint-disable no-unused-vars */
import React, { useState } from 'react';

const Calculator = ({ url }) => {
  // State to hold the current input and result
  const [input, setInput] = useState('');

  // Handle button clicks
  const handleClick = (value) => {
    setInput((prevInput) => prevInput + value); // Append the clicked value to the input string
  };

  // Handle calculation
  const handleCalculate = () => {
    try {
      // Evaluate the expression using eval (use with caution in production, ideally replaced with a safe expression parser)
      setInput(eval(input).toString());
    } catch (error) {
      setInput('Error');
    }
  };

  // Handle clearing the input
  const handleClear = () => {
    setInput('');
  };

  // Handle deleting the last character
  const handleDelete = () => {
    setInput(input.slice(0, -1));
  };

  return (
    <div className="calculator-container">
      <h1>Calculator</h1>
      <div className="calculator">
        <div className="display">
          <input type="text" value={input} readOnly />
        </div>
        <div className="buttons">
          <button onClick={() => handleClick('1')}>1</button>
          <button onClick={() => handleClick('2')}>2</button>
          <button onClick={() => handleClick('3')}>3</button>
          <button onClick={() => handleClick('+')}>+</button>

          <button onClick={() => handleClick('4')}>4</button>
          <button onClick={() => handleClick('5')}>5</button>
          <button onClick={() => handleClick('6')}>6</button>
          <button onClick={() => handleClick('-')}>-</button>

          <button onClick={() => handleClick('7')}>7</button>
          <button onClick={() => handleClick('8')}>8</button>
          <button onClick={() => handleClick('9')}>9</button>
          <button onClick={() => handleClick('*')}>*</button>

          <button onClick={() => handleClick('0')}>0</button>
          <button onClick={handleClear}>C</button>
          <button onClick={handleDelete}>DEL</button>
          <button onClick={() => handleClick('/')}>/</button>

          <button className="equal-button" onClick={handleCalculate}>=</button>
        </div>
      </div>

      {/* Style for the Calculator */}
      <style jsx>{`
        /* Calculator Styling */
        .calculator-container {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          height: 100vh;
          background-color: #f4f4f9;
          font-family: 'Arial', sans-serif;
        }

        h1 {
          font-size: 2.5rem;
          margin-bottom: 20px;
          color: #333;
        }

        .calculator {
          background-color: #fff;
          border-radius: 10px;
          padding: 20px;
          box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
          max-width: 400px; /* Max width for larger screens */
          width: 100%;
        }

        .display input {
          width: 100%;
          padding: 15px;
          font-size: 2rem;
          text-align: right;
          border-radius: 5px;
          border: 2px solid #ddd;
          margin-bottom: 15px;
          background-color: #f9f9f9;
        }

        .buttons {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          grid-gap: 10px;
        }

        button {
          font-size: 1.5rem;
          padding: 20px;
          background-color: #f0f0f0;
          border: none;
          border-radius: 8px;
          cursor: pointer;
          transition: background-color 0.3s ease;
          box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
        }

        button:hover {
          background-color: #e0e0e0;
        }

        button:active {
          background-color: #ccc;
        }

        button:focus {
          outline: none;
        }

        button.equal-button {
          background-color: #ff9900;
          color: white;
          grid-column: span 4;
        }

        button.equal-button:hover {
          background-color: #e68900;
        }

        button.equal-button:active {
          background-color: #cc7a00;
        }

        /* Responsive Design */
        @media (max-width: 768px) {
          .calculator-container {
            padding: 10px;
          }

          .calculator {
            width: 100%;
            padding: 15px;
          }

          .display input {
            font-size: 1.8rem;
            padding: 12px;
          }

          button {
            font-size: 1.3rem;
            padding: 15px;
          }
        }

        @media (max-width: 480px) {
          h1 {
            font-size: 2rem;
            margin-bottom: 10px;
          }

          .display input {
            font-size: 1.5rem;
            padding: 10px;
          }

          button {
            font-size: 1.2rem;
            padding: 12px;
          }
        }
      `}</style>
    </div>
  );
};

export default Calculator;
